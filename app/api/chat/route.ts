import OpenAI from "openai";
import { NextResponse } from "next/server";
import { PROFILE } from "@/data/profile";
import { SYSTEM_PROMPT, getPredefinedAnswer } from "@/lib/chat-context";
import { clientIp, createRateLimiter } from "@/lib/rate-limit";

const MAX_MESSAGE_CHARS = 500;
const MAX_SUMMARY_CHARS = 20_000;

const chatLimiter = createRateLimiter(20, 10 * 60_000);
const summaryLimiter = createRateLimiter(30, 10 * 60_000);

let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY || "",
    });
  }
  return openaiClient;
}

const FIRST_NAME = PROFILE.name.split(" ")[0];
const NO_KEY_REPLY = `I can answer questions about ${FIRST_NAME}'s projects, tech stack, experience, education and how to get in touch. For anything else, email ${PROFILE.email}.`;

export async function POST(req: Request) {
  try {
    const { messages, mode, content } = await req.json();
    const ip = clientIp(req);
    const hasKey = Boolean(process.env.OPENROUTER_API_KEY);

    if (mode === "summary") {
      // Summaries are an optional extra: stay quiet until a key is configured.
      if (!hasKey) return NextResponse.json({ summary: null });

      if (
        typeof content !== "string" ||
        !content.trim() ||
        content.length > MAX_SUMMARY_CHARS
      ) {
        return NextResponse.json({ error: "Invalid content" }, { status: 400 });
      }
      if (!summaryLimiter(ip)) {
        return NextResponse.json(
          { error: "Too many requests" },
          { status: 429 },
        );
      }

      const completion = await getOpenAIClient().chat.completions.create({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Summarize the given blog into 2-3 short bullet points. Keep it crisp and easy to scan. ",
          },
          {
            role: "user",
            content: content,
          },
        ],
      });

      return NextResponse.json({
        summary: completion.choices[0].message.content,
      });
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 },
      );
    }

    const userMessage = messages[messages.length - 1]?.content;
    if (typeof userMessage !== "string" || !userMessage.trim()) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }
    if (userMessage.length > MAX_MESSAGE_CHARS) {
      return NextResponse.json({ error: "Message too long" }, { status: 400 });
    }

    const predefined = getPredefinedAnswer(userMessage);

    if (predefined) {
      return NextResponse.json({
        reply: { content: predefined },
      });
    }

    if (!hasKey) {
      return NextResponse.json({ reply: { content: NO_KEY_REPLY } });
    }

    if (!chatLimiter(ip)) {
      return NextResponse.json(
        { error: "Too many messages. Please try again in a few minutes." },
        { status: 429 },
      );
    }

    // The client controls this array, so only accept short plain chat turns.
    const chatTurns = messages
      .filter(
        (m: { role?: string; content?: unknown }) =>
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string",
      )
      .slice(-10)
      .map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content.slice(0, MAX_MESSAGE_CHARS),
      }));

    const completion = await getOpenAIClient().chat.completions.create({
      model: "openai/gpt-3.5-turbo",

      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        ...chatTurns,
      ],
    });

    return NextResponse.json({
      reply: {
        content: completion.choices[0].message.content,
      },
    });
  } catch (err: unknown) {
    // Keep upstream error details in the server log, not in the response.
    console.error(
      "Chat route error:",
      err instanceof Error ? err.message : err,
    );

    return NextResponse.json(
      { error: "The assistant is unavailable right now." },
      { status: 502 },
    );
  }
}
