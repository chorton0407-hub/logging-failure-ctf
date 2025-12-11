import "./globals.css"; // optional, only if you have this file

import type { ReactNode } from "react";

export const metadata = {
  title: "Logging & Alerting Failure CTF",
  description: "CTF challenge demonstrating logging and alerting failures.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black">
        {children}
      </body>
    </html>
  );
}