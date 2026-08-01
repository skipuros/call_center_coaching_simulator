import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Call Center Coaching Simulator",
  description:
    "An interactive coaching simulation for practicing service quality and call accuracy.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
