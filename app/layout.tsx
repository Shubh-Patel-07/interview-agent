import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
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
  title: "SteerHire | AI Interview Platform & Career Accelerator",
  description: "Practice technical and behavioral mock interviews with an adaptive AI interviewer tailored to your resume, role, and target difficulty. Get instant hiring reports.",
  keywords: ["SteerHire", "AI Interviewer", "Mock Interview", "Tech Interview Prep", "Linear UI SaaS", "Resume Analysis"],
  authors: [{ name: "SteerHire Product Team" }],
  openGraph: {
    title: "SteerHire | World-Class AI Interview SaaS Platform",
    description: "Build the interviewer, not the interview. Experience adaptive AI interview practice.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full antialiased`}>
      <body className={`${inter.className} min-h-full flex flex-col transition-colors duration-300 selection:bg-blue-500 selection:text-white`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
