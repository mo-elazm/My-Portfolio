import type { Dictionary } from "./en";
import en from "./en";
import ar from "./ar";

export const translations: Record<"en" | "ar", Dictionary> = { en, ar };

export const defaultLanguage = "en";
export const supportedLanguages = ["en", "ar"] as const;
