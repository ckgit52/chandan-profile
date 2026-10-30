---
title: "Building Async REST APIs in Rust with Actix-Web and Tokio"
date: "Friday, Oct 9, 2026"
description: "A practical walkthrough of structuring a production REST API in Rust: extractors, shared state, error handling, auth and RBAC, background tasks and the PostgreSQL habits that keep it fast."
tags:
  [
    "Rust",
    "Actix-Web",
    "Tokio",
    "REST APIs",
    "PostgreSQL",
    "SQLx",
    "JWT",
    "RBAC",
    "Backend Development",
    "Async Rust",
  ]
---

Rust has a reputation for being hard to learn and easy to trust. For backend services, that trade is worth making: once an Actix-Web API compiles, a whole class of runtime surprises (null dereferences, data races, forgotten error branches) is already gone. What is left is the part that matters, which is designing the service well.

This post walks through the structure I reach for when building a production REST API with Actix-Web, Tokio and PostgreSQL.

---

## Start with extractors and shared state

Actix-Web handlers are plain async functions. Anything they need, whether the request body, the database pool or the authenticated user, arrives through an extractor. That keeps handlers short and makes the dependencies visible in the signature.

```rust
use actix_web::{post, web, HttpResponse};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;

#[derive(Deserialize)]
struct CreateUser {
    email: String,
    name: String,
}

#[derive(Serialize, sqlx::FromRow)]
struct User {
    id: i64,
    email: String,
    name: String,
}

#[post("/users")]
async fn create_user(
    pool: web::Data<PgPool>,
    body: web::Json<CreateUser>,
) -> Result<HttpResponse, ApiError> {
    let user = sqlx::query_as::<_, User>(
        "INSERT INTO users (email, name) VALUES ($1, $2) RETURNING id, email, name",
    )
    .bind(&body.email)
    .bind(&body.name)
    .fetch_one(pool.get_ref())
    .await?;

    Ok(HttpResponse::Created().json(user))
}
```

`PgPool` is already a cheap, cloneable handle, so register it once with `App::new().app_data(web::Data::new(pool))` and every worker thread shares the same connection pool.

---

## One error type for the whole API

The `?` operator only feels good when every failure converts into something the framework can turn into a response. Define a single error enum, implement `ResponseError`, and let every handler return `Result<_, ApiError>`.

```rust
use actix_web::{http::StatusCode, HttpResponse, ResponseError};

#[derive(Debug, thiserror::Error)]
enum ApiError {
    #[error("not found")]
    NotFound,
    #[error("unauthorized")]
    Unauthorized,
    #[error("forbidden")]
    Forbidden,
    #[error("invalid request: {0}")]
    Validation(String),
    #[error("internal error")]
    Internal(#[from] sqlx::Error),
}

impl ResponseError for ApiError {
    fn status_code(&self) -> StatusCode {
        match self {
            ApiError::NotFound => StatusCode::NOT_FOUND,
            ApiError::Unauthorized => StatusCode::UNAUTHORIZED,
            ApiError::Forbidden => StatusCode::FORBIDDEN,
            ApiError::Validation(_) => StatusCode::UNPROCESSABLE_ENTITY,
            ApiError::Internal(_) => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }

    fn error_response(&self) -> HttpResponse {
        if let ApiError::Internal(source) = self {
            tracing::error!(error = ?source, "database error");
        }
        HttpResponse::build(self.status_code())
            .json(serde_json::json!({ "error": self.to_string() }))
    }
}
```

Notice that the internal variant logs the real cause but returns only "internal error" to the client. Clients get a stable contract, and your logs keep the detail.

---

## Authentication and RBAC as extractors

Authentication fits Actix-Web's extractor model well. Implement `FromRequest` for an `AuthUser` type that verifies the JWT, and any handler that lists `AuthUser` in its arguments is protected. Authorization is then a one-line check against the role carried by the token.

```rust
#[derive(PartialEq, Eq)]
enum Role {
    Admin,
    Member,
}

struct AuthUser {
    id: i64,
    role: Role,
}

impl AuthUser {
    fn require(&self, role: Role) -> Result<(), ApiError> {
        if self.role == role || self.role == Role::Admin {
            Ok(())
        } else {
            Err(ApiError::Forbidden)
        }
    }
}
```

Keeping the policy in one small type means a new endpoint cannot forget to check it without it being obvious in review.

---

## Validate at the edge

Deserialising JSON into a struct proves the shape is right, not that the values make sense. Put validation (length, format, ranges) right after extraction so that handlers and the database only ever see data that passed the rules. The `validator` crate's derive macros keep these rules next to the type they describe.

---

## Do not block the executor

Tokio multiplexes thousands of tasks over a small number of threads, which only works if tasks yield. CPU-heavy work such as password hashing or large JSON transforms should move to a blocking thread:

```rust
let hash = web::block(move || hash_password(&password)).await??;
```

Blocking calls inside an async handler are the most common cause of "the API is fast, except sometimes".

---

## Background tasks with `tokio::spawn`

Reminders, billing runs and leaderboard refreshes do not belong in the request path. A spawned task with an interval is often all you need:

```rust
tokio::spawn({
    let pool = pool.clone();
    async move {
        let mut tick = tokio::time::interval(std::time::Duration::from_secs(60));
        loop {
            tick.tick().await;
            if let Err(error) = refresh_leaderboards(&pool).await {
                tracing::error!(?error, "leaderboard refresh failed");
            }
        }
    }
});
```

Log failures and keep the loop alive: a scheduled job that exits silently on the first error is worse than one that is noisy.

---

## Make PostgreSQL do less work

Most API latency problems turn out to be query problems. The habits that pay off most:

- Index the columns you filter and sort on, and check with `EXPLAIN ANALYZE` rather than guessing.
- Replace repeated subqueries with a CTE so the expensive part is computed once.
- Select only the columns a response needs.
- Keep transactions short, and never hold one open across a network call.

Indexes and CTE-based queries are what brought latency down on the leaderboard and scoring endpoints of a project I worked on.

---

## Takeaways

- Let extractors carry dependencies, and keep handlers thin.
- Use one error enum that maps to HTTP responses and hides internals.
- Treat auth and validation as types, not as repeated `if` statements.
- Protect the executor from blocking work.
- Measure the database before you optimise the code.

Rust's compiler handles the boring correctness work. Spend the attention it frees up on the design.
