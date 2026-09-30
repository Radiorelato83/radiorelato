import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/Header";
import PlayerBar from "@/components/player/PlayerBar";
import { RadioProvider } from "@/components/providers/RadioProvider";

export const metadata: Metadata = {
  title: "Rádio Relato",
  description: "Desporto com paixão e alma!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body>
        <RadioProvider>
          <Header />

          <PlayerBar />

          {children}
        </RadioProvider>
      </body>
    </html>
  );
}
