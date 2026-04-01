import type { Metadata } from "next";
import { JetBrains_Mono, Sarpanch, Space_Grotesk } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
