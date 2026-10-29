import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Suchit Raute | Developer Passionate About Cybersecurity & Networking",
  description:
    "I'm a Computer Science and Business Systems student passionate about cybersecurity, networking, and building meaningful digital experiences.",
  openGraph: {
    title: "Suchit Raute | Developer Passionate About Cybersecurity & Networking",
    description:
      "Computer Science and Business Systems student building practical software and exploring cybersecurity.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suchit Raute | Developer Passionate About Cybersecurity & Networking",
    description:
      "Computer Science and Business Systems student building practical software and exploring cybersecurity.",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
