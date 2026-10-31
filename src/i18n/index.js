import { useCallback } from "react";
import en from "./en";
import ar from "./ar";
import useAppStore from "@/store/useAppStore";

export const translations = { en, ar };

export function useTranslation() {
	const language = useAppStore((state) => state.language);
	const setLanguage = useAppStore((state) => state.setLanguage);
	const toggleLanguage = useAppStore((state) => state.toggleLanguage);

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
