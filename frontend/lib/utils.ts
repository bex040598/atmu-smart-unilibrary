import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export const MATERIAL_TYPE_LABELS: Record<string, string> = {
  textbook: "Darslik",
  study_guide: "O'quv qo'llanma",
  lecture: "Ma'ruza matni",
  lab_work: "Laboratoriya ishi",
  practical: "Amaliy mashg'ulot",
  presentation: "Taqdimot",
  test: "Test",
  video: "Video dars",
  article: "Ilmiy maqola",
  thesis: "Bitiruv ishi",
  course_work: "Kurs ishi",
  methodology: "Metodik qo'llanma",
  code_sample: "Kod namunasi",
  dataset: "Dataset",
};

export const STATUS_COLORS: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  pending_review: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  needs_revision: "bg-orange-100 text-orange-700",
  archived: "bg-gray-200 text-gray-600",
  pending: "bg-yellow-100 text-yellow-700",
  active: "bg-green-100 text-green-700",
  returned: "bg-blue-100 text-blue-700",
  overdue: "bg-red-100 text-red-700",
};

export const DEPARTMENT_COLORS: Record<string, string> = {
  "axborot-texnologiyalari": "#1457A8",
  matematika: "#008C95",
  iqtisodiyot: "#0E9F6E",
  filologiya: "#D6A84F",
  tarix: "#8B5CF6",
  pedagogika: "#EF4444",
};
