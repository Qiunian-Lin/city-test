import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequest = {
  systemPrompt?: string;
  messages?: ChatMessage[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequest;
    const messages = Array.isArray(body.messages) ? body.messages : [];

    if (!messages.length) {
      return NextResponse.json(
        { error: "messages is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is missing on the server" },
        { status: 500 }
      );
    }

    const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.7,
        messages: [
          ...(body.systemPrompt
            ? [{ role: "system", content: body.systemPrompt }]
            : []),
          ...messages,
        ],
      }),
    });

    const data = await upstream.json();

    console.log("OpenAI status:", upstream.status);
    console.log("OpenAI response:", JSON.stringify(data, null, 2));

    if (!upstream.ok) {
      return NextResponse.json(
        { error: data?.error?.message || "OpenAI request failed", details: data },
        { status: upstream.status }
      );
    }

    const reply = data?.choices?.[0]?.message?.content;

    if (!reply || typeof reply !== "string") {
      return NextResponse.json(
        { error: "OpenAI did not return a valid text reply", details: data },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Route error:", error);

    const message =
      error instanceof Error ? error.message : "Server request handling failed";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}