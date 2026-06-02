"use client";

import { useState, useEffect } from "react";
import { Settings, Globe, Trash2, Sparkles } from "lucide-react";
import { useLocale } from "@/context/locale-context";
import { useToast } from "@/context/toast-context";

export default function SettingsPage() {
  const { locale, setLocale } = useLocale();
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    setApiKey(localStorage.getItem("misrtv-openai-key") || "");
  }, []);

  function saveApiKey() {
    if (apiKey) {
      localStorage.setItem("misrtv-openai-key", apiKey);
    } else {
      localStorage.removeItem("misrtv-openai-key");
    }
    toast(
      locale === "ar" ? "تم الحفظ" : "Saved",
      "success"
    );
  }

  function clearAllData() {
    if (confirm(locale === "ar" ? "هل أنت متأكد؟ سيتم مسح جميع البيانات المحلية." : "Are you sure? All local data will be cleared.")) {
      localStorage.clear();
      toast(
        locale === "ar" ? "تم المسح" : "Cleared",
        "info"
      );
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-bold">
        {locale === "ar" ? "الإعدادات" : "Settings"}
      </h1>

      <div className="mt-8 space-y-8">
        <section className="rounded-2xl border border-cinema-border bg-cinema-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Globe className="h-5 w-5 text-cinema-red" />
            {locale === "ar" ? "اللغة" : "Language"}
          </h2>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`rounded-xl border px-5 py-2.5 text-sm transition-all ${
                locale === "en"
                  ? "border-cinema-red bg-cinema-red/20 text-cinema-red"
                  : "border-cinema-border text-cinema-muted hover:border-cinema-red"
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLocale("ar")}
              className={`rounded-xl border px-5 py-2.5 text-sm transition-all ${
                locale === "ar"
                  ? "border-cinema-red bg-cinema-red/20 text-cinema-red"
                  : "border-cinema-border text-cinema-muted hover:border-cinema-red"
              }`}
            >
              العربية
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-cinema-border bg-cinema-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Sparkles className="h-5 w-5 text-cinema-yellow" />
            {locale === "ar" ? "مفتاح OpenAI" : "OpenAI API Key"}
          </h2>
          <p className="mt-2 text-xs text-cinema-muted">
            {locale === "ar"
              ? "اختياري. أدخل مفتاح OpenAI للحصول على ردود ذكية حقيقية."
              : "Optional. Enter your OpenAI key for real AI responses."}
          </p>
          <div className="mt-4 flex gap-2">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="flex-1 rounded-xl border border-cinema-border bg-cinema-dark px-4 py-2.5 text-sm text-cinema-white placeholder:text-cinema-muted transition-all focus:border-cinema-red focus:outline-none"
            />
            <button
              type="button"
              onClick={saveApiKey}
              className="rounded-xl border border-cinema-red bg-cinema-red px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-cinema-red/90 active:scale-95"
            >
              {locale === "ar" ? "حفظ" : "Save"}
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-cinema-border bg-cinema-card p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-red-400">
            <Trash2 className="h-5 w-5" />
            {locale === "ar" ? "مسح البيانات" : "Clear Data"}
          </h2>
          <p className="mt-2 text-xs text-cinema-muted">
            {locale === "ar"
              ? "مسح جميع البيانات المحلية: المفضلة، قوائم المشاهدة، القوائم."
              : "Clear all local data: likes, watchlist, playlists."}
          </p>
          <button
            type="button"
            onClick={clearAllData}
            className="mt-4 rounded-xl border border-red-500/30 px-5 py-2.5 text-sm text-red-400 transition-all hover:bg-red-500/10 active:scale-95"
          >
            {locale === "ar" ? "مسح الكل" : "Clear all"}
          </button>
        </section>
      </div>
    </div>
  );
}
