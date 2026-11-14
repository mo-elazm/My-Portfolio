"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { navItems } from "@/data/profile";
import { useTranslation } from "@/i18n";
import useAppStore from "@/store/useAppStore";
import { cn } from "@/utils/cn";
import LanguageToggle from "@/components/ui/LanguageToggle";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
	const { t, language } = useTranslation();
	const activeSection = useAppStore((state) => state.activeSection);
	const mobileMenuOpen = useAppStore((state) => state.mobileMenuOpen);
	const toggleMobileMenu = useAppStore((state) => state.toggleMobileMenu);
	const navRef = useRef(null);
	const itemRefs = useRef([]);
	const [pill, setPill] = useState({ left: 0, width: 0, ready: false });

	const updatePill = useCallback(() => {
		const index = navItems.findIndex((item) => item.id === activeSection);
		const element = itemRefs.current[index];

		if (!element) {
			setPill((current) => ({ ...current, ready: false }));
			return;
		}

		const nav = navRef.current;
		const navRect = nav?.getBoundingClientRect();
		const itemRect = element.getBoundingClientRect();

		setPill({
			left: navRect ? itemRect.left - navRect.left : element.offsetLeft,
			width: itemRect.width,
			ready: true,
		});
	}, [activeSection]);

	useEffect(() => {
		updatePill();

		const observer =
			typeof ResizeObserver !== "undefined" ? new ResizeObserver(updatePill) : null;

		if (navRef.current) {
			observer?.observe(navRef.current);
		}

		const timer = window.setTimeout(updatePill, 150);
		document.fonts?.ready?.then(updatePill).catch(() => {});
		window.addEventListener("resize", updatePill);

		return () => {
			window.clearTimeout(timer);
			window.removeEventListener("resize", updatePill);
			observer?.disconnect();
		};
	}, [updatePill, language]);

	return (
		<header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
			<div className="nav-shell mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 rounded-2xl px-2.5 sm:px-3">
				<Logo />

				<nav
					ref={navRef}
					aria-label={t.common.menu}
					className="relative hidden items-center gap-0.5 rounded-full border border-line/70 bg-surface/40 p-1 lg:flex"
				>
					<span
						aria-hidden="true"
						className={cn(
							"absolute inset-y-1 left-0 rounded-full bg-ink transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
							pill.ready ? "opacity-100" : "opacity-0",
						)}
						style={{
							width: `${pill.width}px`,
							transform: `translateX(${pill.left}px)`,
						}}
					/>

					{navItems.map((item, index) => {
						const isActive = activeSection === item.id;

						return (
							<a
								key={item.id}
								ref={(node) => {
									itemRefs.current[index] = node;
								}}
								href={`#${item.id}`}
								aria-current={isActive ? "page" : undefined}
								className={cn(
									"relative z-10 rounded-full px-3 py-1.5 text-[11px] font-semibold leading-none transition-colors duration-300",
									isActive
										? "text-canvas"
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
						data-magnetic
						className="btn btn-primary ms-1 hidden min-h-9 px-4 text-[11px] active:scale-[0.97] xl:inline-flex"
					>
						{t.common.letsTalk}
					</a>

					<button
						type="button"
						onClick={toggleMobileMenu}
						aria-label={mobileMenuOpen ? t.common.close : t.common.openMenu}
						aria-expanded={mobileMenuOpen}
						aria-controls="mobile-menu"
						className="icon-btn size-10 lg:hidden"
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
