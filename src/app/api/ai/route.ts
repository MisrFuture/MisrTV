import { NextRequest, NextResponse } from "next/server";
import { generateAiResponse } from "@/lib/ai";
import type { Locale } from "@/lib/i18n";

export async function POST(req: NextRequest) {
  try {
    const { prompt, locale = "en" } = (await req.json()) as {
      prompt: string;
      locale?: Locale;
    };

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: `You are MisrTV AI, a movie and TV expert for Egyptian and Arab audiences. Reply in ${locale === "ar" ? "Arabic" : "English"}. Be concise about ratings, box office, age ratings (G, PG, PG-13, R, 18+), and recommendations.`,
              },
              { role: "user", content: prompt },
            ],
            max_tokens: 500,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) return NextResponse.json({ reply });
        }
      } catch {
        // fall through to local AI
      }
    }

    const reply = generateAiResponse(prompt, locale as Locale);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "AI request failed" }, { status: 500 });
  }
}
