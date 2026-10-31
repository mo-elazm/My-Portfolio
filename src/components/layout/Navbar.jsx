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
	const scrolled = useScrolled(30);

	const hasBackground = scrolled || mobileMenuOpen;

	return (
		<header className="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-5">
			<div
				className={cn(
					"relative mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-4 rounded-[1.35rem] border px-3 transition-all duration-500 sm:px-4",
					hasBackground
						? "border-line/80 bg-canvas/70 shadow-[0_20px_60px_-42px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
						: "border-transparent bg-transparent",
				)}
			>
				<Logo onClick={() => {}} />

				<nav
					aria-label={t.common.menu}
					className="glass-chip absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full p-1 lg:flex"
				>
					{navItems.map((item) => {
						const isActive = activeSection === item.id;
						return (
							<a
								key={item.id}
								href={`#${item.id}`}
								aria-current={isActive ? "page" : undefined}
								className={cn(
									"rounded-full px-3 py-2 text-[11px] font-semibold transition-all duration-300 xl:px-4 xl:text-[12px]",
									isActive
										? "bg-ink text-canvas shadow-[0_10px_24px_-16px_rgba(0,0,0,0.55)]"
										: "text-muted hover:bg-ink/[0.05] hover:text-ink",
								)}
							>
								{t.nav[item.key]}
							</a>
						);
					})}
				</nav>

				<div className="flex items-center gap-2">
					<LanguageToggle className="hidden sm:inline-flex" />
					<ThemeToggle />

					<a
						href="#contact"
						className="ms-1 hidden h-10 items-center rounded-full bg-accent px-4 text-[11px] font-extrabold text-[#0a100b] shadow-[0_14px_34px_-18px_var(--glow)] transition-colors duration-300 hover:bg-ink hover:text-canvas xl:inline-flex"
					>
						{t.common.letsTalk}
					</a>

					<button
						type="button"
						onClick={toggleMobileMenu}
						aria-label={mobileMenuOpen ? t.common.close : t.common.openMenu}
						aria-expanded={mobileMenuOpen}
						aria-controls="mobile-menu"
						className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-surface/70 text-ink transition-colors hover:border-accent-text/50 hover:text-accent-text lg:hidden"
					>
						{mobileMenuOpen ? (
							<FiX aria-hidden="true" className="size-5" />
						) : (
							<FiMenu aria-hidden="true" className="size-5" />
						)}
					</button>
				</div>
			</div>
		</header>
	);
}
