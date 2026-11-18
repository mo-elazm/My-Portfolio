"use client";

import { useCallback, useEffect } from "react";
import { FiArrowUpRight, FiMail, FiPhone } from "react-icons/fi";
import { navItems, profile } from "@/data/profile";
import { useTranslation } from "@/i18n";
import useAppStore from "@/store/useAppStore";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";
import { cn } from "@/utils/cn";
import SocialLinks from "@/components/ui/SocialLinks";

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
				"fixed inset-0 z-40 min-h-[100svh] overflow-y-auto bg-canvas transition-all duration-500 lg:hidden",
				isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
			)}
		>
			<div
				aria-hidden="true"
				className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -end-24 top-24 size-72 rounded-full bg-accent/[0.05] blur-[110px] dark:bg-accent/10"
			/>

			<div
				className={cn(
					"relative flex min-h-[100svh] flex-col px-4 pb-[calc(2rem_+_env(safe-area-inset-bottom))] pt-[calc(6rem_+_env(safe-area-inset-top))] transition-transform duration-500 sm:px-6",
					isOpen ? "translate-y-0" : "translate-y-4",
				)}
			>
				<p className="eyebrow-label">{t.common.menu}</p>

				<nav className="mt-4 flex-1" aria-label={t.common.menu}>
					{navItems.map((item, index) => (
						<a
							key={item.id}
							href={`#${item.id}`}
							onClick={closeMenu}
							style={{ transitionDelay: isOpen ? `${100 + index * 40}ms` : "0ms" }}
							className={cn(
								"group flex min-h-[44px] items-center justify-between gap-3 border-b border-line py-3 transition-all duration-500",
								isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
							)}
						>
							<span className="flex min-w-0 items-baseline gap-3">
								<span className="shrink-0 font-mono text-[10px] text-accent-text">
									{String(index + 1).padStart(2, "0")}
								</span>
								<span className="break-words font-display text-[clamp(1.45rem,7vw,2.2rem)] font-bold leading-none tracking-[-0.04em] text-ink transition-colors group-hover:text-accent-text rtl:tracking-normal">
									{t.nav[item.key]}
								</span>
							</span>
							<FiArrowUpRight
								aria-hidden="true"
								className="size-5 shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text rtl:-scale-x-100"
							/>
						</a>
					))}
				</nav>

				<div className="mt-6 flex flex-col gap-1 border-t border-line pt-4">
					<a
						href={`mailto:${profile.email}`}
						onClick={closeMenu}
						className="inline-flex min-h-[44px] min-w-0 items-center gap-2.5 text-sm font-semibold text-ink"
					>
						<FiMail aria-hidden="true" className="size-4 shrink-0 text-accent-text" />
						<span dir="ltr" className="truncate">
							{profile.email}
						</span>
					</a>
					<a
						href={`tel:${profile.phone}`}
						onClick={closeMenu}
						className="inline-flex min-h-[44px] min-w-0 items-center gap-2.5 text-sm font-semibold text-ink"
					>
						<FiPhone aria-hidden="true" className="size-4 shrink-0 text-accent-text" />
						<span dir="ltr" className="truncate">
							{profile.phoneDisplay}
						</span>
					</a>

					<div className="mt-2 flex items-center justify-between gap-4">
						<SocialLinks />
						<span className="font-mono text-[8px] font-medium uppercase tracking-[0.16em] text-muted/70">
							EG / 2026
						</span>
					</div>

					<a
						href="#contact"
						onClick={closeMenu}
						className="btn btn-primary mt-3 min-h-[44px] w-full active:scale-[0.97]"
					>
						{t.common.letsTalk}
					</a>
				</div>
			</div>
		</div>
	);
}
