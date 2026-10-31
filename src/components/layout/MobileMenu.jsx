import { useCallback, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { FiArrowUpRight, FiMail } from "react-icons/fi";
import { getWhatsAppLink, navItems, profile } from "@/data/profile";
import { useTranslation } from "@/i18n";
import useAppStore from "@/store/useAppStore";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";
import { cn } from "@/utils/cn";
import LanguageToggle from "@/components/ui/LanguageToggle";
import SocialLinks from "@/components/ui/SocialLinks";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function MobileMenu() {
	const { t } = useTranslation();
	const isOpen = useAppStore((state) => state.mobileMenuOpen);
	const setMobileMenuOpen = useAppStore((state) => state.setMobileMenuOpen);
	const closeMenu = useCallback(() => setMobileMenuOpen(false), [setMobileMenuOpen]);

	useLockBodyScroll(isOpen);

	useEffect(() => {
		if (!isOpen) {
			return undefined;
		}

		const onKeyDown = (event) => {
			if (event.key === "Escape") {
				closeMenu();
			}
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [isOpen, closeMenu]);

	useEffect(() => {
		const onResize = () => {
			if (window.innerWidth >= 1024) {
				closeMenu();
			}
		};

		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, [closeMenu]);

	return (
		<div
			id="mobile-menu"
			inert={!isOpen}
			aria-hidden={!isOpen}
			className={cn(
				"fixed inset-0 z-40 flex flex-col overflow-y-auto bg-canvas transition-all duration-500 lg:hidden",
				isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
			)}
		>
			<div className="visual-grid absolute inset-0 opacity-45" aria-hidden="true" />
			<div className="absolute -end-24 top-24 size-72 rounded-full bg-accent/15 blur-[100px]" aria-hidden="true" />

			<div
				className={cn(
					"relative flex min-h-full flex-col px-6 pb-8 pt-28 transition-transform duration-500 sm:px-8",
					isOpen ? "translate-y-0" : "translate-y-5",
				)}
			>
				<p className="eyebrow-label">{t.common.menu}</p>

				<nav className="mt-5 flex-1" aria-label={t.common.menu}>
					{navItems.map((item, index) => (
						<a
							key={item.id}
							href={`#${item.id}`}
							onClick={closeMenu}
							style={{ transitionDelay: isOpen ? `${120 + index * 45}ms` : "0ms" }}
							className={cn(
								"group flex items-center justify-between border-b border-line py-4 transition-all duration-500",
								isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
							)}
						>
							<span className="flex items-baseline gap-4">
								<span className="font-mono text-[10px] text-accent-text">
									0{index + 1}
								</span>
								<span className="font-display text-[clamp(2rem,9vw,3rem)] font-medium leading-none tracking-[-0.05em] text-ink transition-colors group-hover:text-accent-text">
									{t.nav[item.key]}
								</span>
							</span>
							<FiArrowUpRight
								aria-hidden="true"
								className="size-5 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text rtl:-scale-x-100"
							/>
						</a>
					))}
				</nav>

				<div className="mt-8 flex flex-wrap items-center justify-between gap-5">
					<div className="flex items-center gap-2">
						<ThemeToggle />
						<LanguageToggle />
					</div>
					<SocialLinks />
				</div>

				<div className="mt-7 flex flex-col gap-3 border-t border-line pt-5">
					<a
						href={`mailto:${profile.email}`}
						onClick={closeMenu}
						className="inline-flex items-center gap-2 text-sm font-semibold text-ink"
					>
						<FiMail aria-hidden="true" className="size-4 text-accent-text" />
						<span dir="ltr">{profile.email}</span>
					</a>
					<a
						href={getWhatsAppLink("Hi Mohamed, I found your portfolio.")}
						target="_blank"
						rel="noreferrer noopener"
						onClick={closeMenu}
						className="inline-flex items-center gap-2 text-sm font-semibold text-ink"
					>
						<FaWhatsapp aria-hidden="true" className="size-4 text-accent-text" />
						<span dir="ltr">{profile.whatsappDisplay}</span>
					</a>

					<div className="mt-1 flex items-center justify-between gap-4">
						<SocialLinks />
						<span className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted/60">
							Egypt / 2026
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
