"use client";

import { useCallback } from "react";
import { usePreferences } from "@/providers/PreferencesProvider";
import { translations } from "./translations";

export { translations };

export function useTranslation() {
	const { language, setLanguage, toggleLanguage } = usePreferences();

	const changeLanguage = useCallback(
		(nextLanguage) => {
			setLanguage(nextLanguage);
		},
		[setLanguage],
	);

	return {
		t: translations[language],
		language,
		isRTL: language === "ar",
		setLanguage: changeLanguage,
		toggleLanguage,
	};
}
