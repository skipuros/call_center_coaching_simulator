import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://skipuros.github.io/call_center_coaching_simulator/",
  ),
  title: "Call Center Coaching Simulator | Interactive Learning Portfolio",
  description:
    "Interactive coaching simulation with representative selection, branching customer service scenarios, performance scoring, and immediate coaching feedback.",
  icons: {
    icon: "./favicon.svg",
    shortcut: "./favicon.svg",
  },
  openGraph: {
    title: "Call Center Coaching Simulator | Interactive Learning Portfolio",
    description:
      "Practice customer service decisions and receive immediate feedback on service quality and call accuracy.",
    url: "https://skipuros.github.io/call_center_coaching_simulator/",
    siteName: "Steve Kipuros Learning Portfolio",
    type: "website",
    images: [
      {
        url: "simulator-preview.jpg",
        width: 1698,
        height: 842,
        alt: "Call Center Coaching Simulator representative selection screen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Call Center Coaching Simulator | Interactive Learning Portfolio",
    description:
      "Practice customer service decisions and receive immediate coaching feedback.",
    images: ["simulator-preview.jpg"],
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
