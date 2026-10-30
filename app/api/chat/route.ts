import OpenAI from "openai";
import { NextResponse } from "next/server";
import { SYSTEM_PROMPT, getPredefinedAnswer } from "@/lib/chat-context";

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

export async function POST(req: Request) {
  try {
    const { messages, mode, content } = await req.json();

    if (mode === "summary") {
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

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 },
      );
    }

    const userMessage = messages[messages.length - 1].content;

    const predefined = getPredefinedAnswer(userMessage);

    if (predefined) {
      return NextResponse.json({
        reply: { content: predefined },
      });
    }

    // The client controls this array, so only accept plain chat turns.
    const chatTurns = messages
      .filter(
        (m: { role?: string }) => m.role === "user" || m.role === "assistant",
      )
      .slice(-10);

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
    const errorMessage =
      err instanceof Error ? err.message : "Something went wrong";
    console.error("ERROR:", errorMessage);

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
