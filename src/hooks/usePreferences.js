import { useEffect } from "react";
import { translations } from "@/i18n";
import useAppStore from "@/store/useAppStore";

const setMetaContent = (selector, content) => {
	const element = document.querySelector(selector);
	if (element) {
		element.setAttribute("content", content);
	}
};

export default function usePreferences() {
	const theme = useAppStore((state) => state.theme);
	const language = useAppStore((state) => state.language);

	useEffect(() => {
		const root = document.documentElement;
		const isDark = theme === "dark";

		root.classList.toggle("dark", isDark);
		root.dataset.theme = theme;
		root.style.colorScheme = theme;

		setMetaContent('meta[name="theme-color"]', isDark ? "#080b09" : "#f3f0e7");
	}, [theme]);

	useEffect(() => {
		const root = document.documentElement;
		const content = translations[language];

		root.lang = language;
		root.dir = language === "ar" ? "rtl" : "ltr";
		root.dataset.language = language;

		document.title = content.meta.title;
		setMetaContent('meta[name="description"]', content.meta.description);
		setMetaContent('meta[property="og:title"]', content.meta.title);
		setMetaContent('meta[property="og:description"]', content.meta.description);
	}, [language]);
}
