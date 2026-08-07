import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "The Interview Agent | Build the Interviewer, Not the Interview",
  description: "AI-Powered SaaS platform conducting adaptive, resume-tailored technical & behavioral interviews with instant real-time evaluation and actionable reports.",
  keywords: ["AI Interviewer", "Mock Interview", "Tech Interview Prep", "AI SaaS", "Resume Analysis"],
  authors: [{ name: "Interview Agent Team" }],
  openGraph: {
    title: "The Interview Agent | AI Mock Interview SaaS",
    description: "Practice real tech interviews with an adaptive AI interviewer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${outfit.variable} h-full antialiased`}>
      <body className={`${inter.className} min-h-full flex flex-col bg-[#05070d] text-slate-100 selection:bg-purple-500 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
