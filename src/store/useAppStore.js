import { create } from "zustand";

const useAppStore = create((set) => ({
	mobileMenuOpen: false,
	activeSection: "home",
	activeCertificate: null,
	introActive: false,
	introDone: false,
	setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
	toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
	setActiveSection: (activeSection) => set({ activeSection }),
	openCertificate: (activeCertificate) => set({ activeCertificate }),
	closeCertificate: () => set({ activeCertificate: null }),
	setIntroActive: (introActive) => set({ introActive }),
	setIntroDone: (introDone) => set({ introDone }),
	completeIntro: () => set({ introActive: false, introDone: true }),
	markIntroReady: () => set({ introDone: true }),
	endIntro: () => set({ introActive: false, introDone: true }),
}));

export default useAppStore;
