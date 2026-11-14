"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from "react";
import { translations } from "@/i18n/translations";
import useAppStore from "@/store/useAppStore";

export type Theme = "dark" | "light";
export type Language = "en" | "ar";

type PreferencesValue = {
	theme: Theme;
	language: Language;
	isRTL: boolean;
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
	setLanguage: (language: Language) => void;
	toggleLanguage: () => void;
};

const PreferencesContext = createContext<PreferencesValue | null>(null);

const THEME_COOKIE = "mo-theme";
const LANGUAGE_COOKIE = "mo-lang";
const ONE_YEAR = 60 * 60 * 24 * 365;

const writeCookie = (name: string, value: string) => {
	const secure = window.location.protocol === "https:" ? ";secure" : "";
	document.cookie = `${name}=${value};path=/;max-age=${ONE_YEAR};samesite=lax${secure}`;
};

const applyTheme = (theme: Theme) => {
	const root = document.documentElement;
	const isDark = theme === "dark";

	root.classList.toggle("dark", isDark);
	root.dataset.theme = theme;
	root.style.colorScheme = theme;

	document
		.querySelectorAll('meta[name="theme-color"]')
		.forEach((meta) => meta.setAttribute("content", isDark ? "#09090B" : "#F3F4F6"));
};

const setMetaContent = (selector: string, content: string) => {
	document.querySelector(selector)?.setAttribute("content", content);
};

const applyLanguage = (language: Language) => {
	const root = document.documentElement;
	const content = translations[language];

	root.lang = language;
	root.dir = language === "ar" ? "rtl" : "ltr";
	root.dataset.language = language;

	document.title = content.meta.title;
	setMetaContent('meta[name="description"]', content.meta.description);
	setMetaContent('meta[property="og:title"]', content.meta.title);
	setMetaContent('meta[property="og:description"]', content.meta.description);
	setMetaContent('meta[name="twitter:title"]', content.meta.title);
	setMetaContent('meta[name="twitter:description"]', content.meta.description);
	setMetaContent('meta[property="og:locale"]', language === "ar" ? "ar_EG" : "en_US");
};

export default function PreferencesProvider({
	initialTheme,
	initialLanguage,
	children,
}: {
	initialTheme: Theme;
	initialLanguage: Language;
	children: ReactNode;
}) {
	const [theme, setThemeState] = useState<Theme>(initialTheme);
	const [language, setLanguageState] = useState<Language>(initialLanguage);
	const setMobileMenuOpen = useAppStore((state) => state.setMobileMenuOpen);

	const setTheme = useCallback((nextTheme: Theme) => {
		const resolved: Theme = nextTheme === "light" ? "light" : "dark";
		setThemeState(resolved);
		writeCookie(THEME_COOKIE, resolved);
		applyTheme(resolved);
	}, []);

	const toggleTheme = useCallback(() => {
		const resolved: Theme = theme === "dark" ? "light" : "dark";
		setThemeState(resolved);
		writeCookie(THEME_COOKIE, resolved);
		applyTheme(resolved);
	}, [theme]);

	const setLanguage = useCallback(
		(nextLanguage: Language) => {
			const resolved: Language = nextLanguage === "ar" ? "ar" : "en";
			setLanguageState(resolved);
			writeCookie(LANGUAGE_COOKIE, resolved);
			setMobileMenuOpen(false);
		},
		[setMobileMenuOpen],
	);

	const toggleLanguage = useCallback(() => {
		const resolved: Language = language === "ar" ? "en" : "ar";
		setLanguageState(resolved);
		writeCookie(LANGUAGE_COOKIE, resolved);
		setMobileMenuOpen(false);
	}, [language, setMobileMenuOpen]);

	useEffect(() => {
		applyTheme(theme);
	}, [theme]);

	useEffect(() => {
		applyLanguage(language);
	}, [language]);

	const value = useMemo<PreferencesValue>(
		() => ({
			theme,
			language,
			isRTL: language === "ar",
			setTheme,
			toggleTheme,
			setLanguage,
			toggleLanguage,
		}),
		[theme, language, setTheme, toggleTheme, setLanguage, toggleLanguage],
	);

	return (
		<PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
	);
}

export function usePreferences() {
	const context = useContext(PreferencesContext);

	if (!context) {
		throw new Error("usePreferences must be used inside PreferencesProvider");
	}

	return context;
}

export { THEME_COOKIE, LANGUAGE_COOKIE };
