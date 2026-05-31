"use client";

import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { useLocale } from "@/context/locale-context";
import { generateAiResponse } from "@/lib/ai";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AiChat() {
  const { dict, locale } = useLocale();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));

    const reply = generateAiResponse(text, locale);
    setMessages((m) => [...m, { role: "assistant", content: reply }]);
    setLoading(false);
  }

  return (
    <div className="flex h-[min(70vh,600px)] flex-col rounded-2xl border border-cinema-border bg-cinema-card">
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center text-cinema-muted">
            <Bot className="mb-3 h-12 w-12 text-cinema-gold/50" />
            <p className="text-sm">{dict.ai.subtitle}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {dict.ai.suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => sendMessage(s)}
                  className="rounded-lg border border-cinema-border px-3 py-2 text-xs text-zinc-400 transition hover:border-cinema-gold/50 hover:text-cinema-gold"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "flex gap-3",
              msg.role === "user" ? "flex-row-reverse" : ""
            )}
          >
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                msg.role === "user"
                  ? "bg-cinema-gold/20 text-cinema-gold"
                  : "bg-violet-500/20 text-violet-400"
              )}
            >
              {msg.role === "user" ? (
                <User className="h-4 w-4" />
              ) : (
                <Bot className="h-4 w-4" />
              )}
            </div>
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap",
                msg.role === "user"
                  ? "bg-cinema-gold/15 text-white"
                  : "bg-cinema-dark text-zinc-300"
              )}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <p className="text-center text-sm text-cinema-muted animate-pulse">
            {dict.ai.thinking}
          </p>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="flex gap-2 border-t border-cinema-border p-4"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={dict.ai.placeholder}
          className="flex-1 rounded-xl border border-cinema-border bg-cinema-dark px-4 py-3 text-white placeholder:text-cinema-muted focus:border-cinema-gold focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-cinema-gold px-4 py-3 font-medium text-cinema-dark disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          {dict.ai.send}
        </button>
      </form>
    </div>
  );
}
