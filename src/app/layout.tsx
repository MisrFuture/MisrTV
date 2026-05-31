import type { Metadata } from "next";
import { LocaleProvider } from "@/context/locale-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/ui/page-transition";
import "./globals.css";

export const metadata: Metadata = {
  title: "MisrTV — Egyptian Movies & TV",
  description:
    "MisrTV — Egyptian movies and TV. Bilingual EN/AR, financial analysis, AI recommendations, and age ratings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <LocaleProvider>
          <Header />
          <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
