"use client";

import { AiChat } from "@/components/ai/ai-chat";
import { useLocale } from "@/context/locale-context";
import { Sparkles } from "lucide-react";

export default function AiPage() {
  const { dict, locale } = useLocale();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cinema-gold">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold">{dict.ai.title}</h1>
          <p className="text-cinema-muted">{dict.ai.subtitle}</p>
        </div>
      </div>
      <AiChat />
      <p className="mt-4 text-center text-xs text-cinema-muted">
        {locale === "ar"
          ? "مدعوم بذكاء مصر تي في — أضف OPENAI_API_KEY لربط GPT"
          : "Powered by MisrTV AI — add OPENAI_API_KEY to connect GPT"}
      </p>
    </div>
  );
}
