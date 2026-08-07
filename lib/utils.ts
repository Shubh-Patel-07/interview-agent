import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatDuration(minutes: number): string {
  return `${minutes} mins`;
}

export function getScoreColor(score: number): {
  text: string;
  bg: string;
  border: string;
} {
  if (score >= 85) {
    return {
      text: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
    };
  } else if (score >= 70) {
    return {
      text: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
    };
  } else if (score >= 55) {
    return {
      text: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
    };
  } else {
    return {
      text: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/30",
    };
  }
}
