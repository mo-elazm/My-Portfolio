import { create } from "zustand";
import { persist } from "zustand/middleware";

const PREFERENCES_KEY = "mo-portfolio-preferences";

const getStoredPreferences = () => {
	if (typeof window === "undefined") {
		return {};
	}

	try {
		return JSON.parse(window.localStorage.getItem(PREFERENCES_KEY) || "{}")?.state || {};
	} catch {
		return {};
	}
};

const stored = getStoredPreferences();
const getInitialTheme = () => (stored.theme === "light" ? "light" : "dark");

const getInitialLanguage = () => (stored.language === "ar" ? "ar" : "en");

const useAppStore = create(
	persist(
		(set) => ({
			theme: getInitialTheme(),
			language: getInitialLanguage(),
			mobileMenuOpen: false,
			activeSection: "home",
			activeCertificate: null,
			setTheme: (theme) => set({ theme }),
			toggleTheme: () => set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
			setLanguage: (language) => set({ language, mobileMenuOpen: false }),
			toggleLanguage: () =>
				set((state) => ({
					language: state.language === "en" ? "ar" : "en",
					mobileMenuOpen: false,
				})),
			setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
			toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
			setActiveSection: (activeSection) => set({ activeSection }),
			openCertificate: (activeCertificate) => set({ activeCertificate }),
			closeCertificate: () => set({ activeCertificate: null }),
		}),
		{
			name: PREFERENCES_KEY,
			version: 1,
			migrate: (persistedState) => ({
				theme: persistedState?.theme === "light" ? "light" : "dark",
				language: persistedState?.language === "ar" ? "ar" : "en",
			}),
			partialize: (state) => ({
				theme: state.theme,
				language: state.language,
			}),
		},
	),
);

export default useAppStore;
