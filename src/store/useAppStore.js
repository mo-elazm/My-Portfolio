import { create } from "zustand";

const useAppStore = create((set) => ({
	mobileMenuOpen: false,
	activeSection: "home",
	activeCertificate: null,
	setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
	toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
	setActiveSection: (activeSection) => set({ activeSection }),
	openCertificate: (activeCertificate) => set({ activeCertificate }),
	closeCertificate: () => set({ activeCertificate: null }),
}));

export default useAppStore;
