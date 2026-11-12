import { FiMenu, FiX } from "react-icons/fi";
import { navItems } from "@/data/profile";
import { useTranslation } from "@/i18n";
import useAppStore from "@/store/useAppStore";
import useScrolled from "@/hooks/useScrolled";
import { cn } from "@/utils/cn";
import LanguageToggle from "@/components/ui/LanguageToggle";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
	const { t } = useTranslation();
	const activeSection = useAppStore((state) => state.activeSection);
	const mobileMenuOpen = useAppStore((state) => state.mobileMenuOpen);
	const toggleMobileMenu = useAppStore((state) => state.toggleMobileMenu);
	const scrolled = useScrolled(20);

	return (
		<header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
			<div
				className={cn(
					"glass-panel mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 rounded-2xl px-2.5 transition-shadow duration-500 sm:px-3",
					scrolled && "shadow-[0_18px_50px_-30px_rgba(0,0,0,0.6)]",
				)}
			>
				<Logo />

				<nav
					aria-label={t.common.menu}
					className="hidden items-center gap-0.5 rounded-full border border-line/70 bg-surface/50 p-1 lg:flex"
				>
					{navItems.map((item) => {
						const isActive = activeSection === item.id;

						return (
							<a
								key={item.id}
								href={`#${item.id}`}
								aria-current={isActive ? "page" : undefined}
								className={cn(
									"rounded-full px-3 py-1.5 text-[11px] font-semibold leading-none transition-colors duration-300",
									isActive
										? "bg-ink text-canvas"
										: "text-muted hover:bg-ink/[0.05] hover:text-ink",
								)}
							>
								{t.nav[item.key]}
							</a>
						);
					})}
				</nav>

				<div className="flex items-center gap-1.5">
					<LanguageToggle />
					<ThemeToggle />

					<a
						href="#contact"
						className="btn btn-primary ms-1 hidden min-h-9 px-4 text-[11px] xl:inline-flex"
					>
						{t.common.letsTalk}
					</a>

					<button
						type="button"
						onClick={toggleMobileMenu}
						aria-label={mobileMenuOpen ? t.common.close : t.common.openMenu}
						aria-expanded={mobileMenuOpen}
						aria-controls="mobile-menu"
						className="icon-btn size-9 lg:hidden"
					>
						{mobileMenuOpen ? (
							<FiX aria-hidden="true" className="size-[18px]" />
						) : (
							<FiMenu aria-hidden="true" className="size-[18px]" />
						)}
					</button>
				</div>
			</div>
		</header>
	);
}
