import { Outlet } from "react-router-dom";
import { useTranslation } from "@/i18n";
import useActiveSection from "@/hooks/useActiveSection";
import usePreferences from "@/hooks/usePreferences";
import useScrollToTop from "@/hooks/useScrollToTop";
import useSectionReveal from "@/hooks/useSectionReveal";
import Backdrop from "@/components/layout/Backdrop";
import Footer from "@/components/layout/Footer";
import MobileMenu from "@/components/layout/MobileMenu";
import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import CertificateLightbox from "@/components/ui/CertificateLightbox";

export default function MainLayout() {
	const { t } = useTranslation();

	usePreferences();
	useScrollToTop();
	useActiveSection();
	useSectionReveal();

	return (
		<div className="relative min-h-screen overflow-x-clip">
			<a
				href="#main-content"
				className="fixed start-4 top-4 z-[80] -translate-y-20 rounded-full bg-accent px-5 py-3 text-xs font-bold text-[#0a100b] transition-transform focus:translate-y-0"
			>
				{t.common.skipToContent}
			</a>

			<Backdrop />

			<ScrollProgress />
			<Navbar />
			<MobileMenu />
			<CertificateLightbox />

			<main id="main-content" className="relative z-10">
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}
