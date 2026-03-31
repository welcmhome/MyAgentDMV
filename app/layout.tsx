import type { Metadata } from "next";
import { JetBrains_Mono, Sarpanch, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Agent DMV",
  description: "Put your agent through the driving test.",
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const sarpanch = Sarpanch({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sarpanch",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`min-h-screen ${spaceGrotesk.variable} ${jetBrainsMono.variable} ${sarpanch.variable}`}
        suppressHydrationWarning
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pt-28 sm:px-6 sm:pt-32 lg:px-8">
            <main className="flex-1 py-6 sm:py-8">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
