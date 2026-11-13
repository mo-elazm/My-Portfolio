"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { FiMapPin } from "react-icons/fi";
import { useTranslation } from "@/i18n";
import { gsap } from "@/lib/gsap";
import { profile } from "@/data/profile";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button";
import SocialLinks from "@/components/ui/SocialLinks";
import StatusPill from "@/components/ui/StatusPill";

export default function Hero() {
	const { t, language } = useTranslation();
	const root = useRef(null);

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return undefined;
		}

		const scope = root.current;

		if (!scope) {
			return undefined;
		}

		const context = gsap.context(() => {
			const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });

			timeline
				.fromTo(
					".hero-line",
					{ yPercent: 100, y: 0 },
					{ yPercent: 0, y: 0, duration: 0.85, stagger: 0.1, ease: "power4.out" },
				)
				.fromTo(
					".hero-pill",
					{ y: 14, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.5 },
					"-=0.45",
				)
				.fromTo(
					".hero-subtitle",
					{ y: 16, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.55, stagger: 0.06 },
					"-=0.35",
				)
				.fromTo(
					".hero-cta",
					{ y: 16, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
					"-=0.35",
				)
				.fromTo(
					".hero-portrait",
					{ scale: 0.96, opacity: 0 },
					{ scale: 1, opacity: 1, duration: 0.9, ease: "power3.out" },
					"-=0.55",
				);
		}, scope);

		return () => context.revert();
	}, [language]);

	return (
		<section
			id="home"
			ref={root}
			className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-24 lg:pt-32"
		>
			<div
				aria-hidden="true"
				className="ambient-mesh pointer-events-none absolute inset-0 opacity-80"
			/>
			<div
				aria-hidden="true"
				className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[72vh] opacity-[0.03] [mask-image:linear-gradient(to_bottom,black,transparent)] dark:opacity-[0.035]"
			/>

			<div className="container-shell relative grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12 xl:gap-16">
				<div className="min-w-0 max-w-[660px]">
					<div className="hero-fade hero-pill flex flex-wrap items-center gap-3">
						<StatusPill label={t.hero.badge} />
						<span className="eyebrow-label">{t.hero.eyebrow}</span>
					</div>

					<h1 className="mt-7 font-display text-[clamp(2.2rem,5.4vw,4.6rem)] font-extrabold leading-[1.02] tracking-[-0.05em] text-ink rtl:text-[clamp(2.15rem,5vw,4.2rem)] rtl:leading-[1.18] rtl:tracking-[-0.02em] sm:mt-8">
						{t.hero.title.map((line, index) => (
							<span key={line} className="hero-line-mask">
								<span
									className={cn(
										"hero-line whitespace-nowrap",
										index === t.hero.title.length - 1 && "text-gradient",
									)}
								>
									{line}
								</span>
							</span>
						))}
					</h1>

					<p className="hero-fade hero-subtitle mt-6 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent-text rtl:font-arabic rtl:tracking-normal">
						{t.hero.role}
					</p>

					<p className="hero-fade hero-subtitle mt-4 max-w-[540px] text-pretty text-[0.98rem] leading-7 text-muted sm:text-[1.05rem] sm:leading-8">
						{t.hero.description}
					</p>

					<div className="hero-fade hero-cta mt-8 flex flex-wrap items-center gap-3">
						<Button href="#work">{t.hero.primaryCta}</Button>
						<Button href="#contact" variant="secondary">
							{t.hero.secondaryCta}
						</Button>
					</div>

					<div className="hero-fade hero-cta mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6">
						<SocialLinks />
						<span className="hidden h-4 w-px bg-line-strong sm:block" aria-hidden="true" />
						<span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted">
							<FiMapPin aria-hidden="true" className="size-3.5 text-accent-text" />
							{t.hero.location}
						</span>
						<span className="hidden text-[11px] text-muted/70 md:inline">
							{t.hero.note}
						</span>
					</div>
				</div>

				<div className="hero-fade hero-portrait relative mx-auto w-full max-w-[430px] lg:max-w-[440px]">
					<div
						aria-hidden="true"
						className="absolute -inset-6 rounded-[3rem] bg-indigo-500/20 blur-2xl"
					/>

					<div className="relative rounded-[2rem] border border-line bg-surface p-2 shadow-[var(--card-shadow)]">
						<div className="relative overflow-hidden rounded-[1.55rem] border border-line bg-surface-2">
							<div className="relative aspect-square">
								<Image
									src={profile.portrait}
									alt={t.about.portraitAlt}
									fill
									priority
									sizes="(max-width: 1024px) 90vw, 440px"
									className="object-cover object-top contrast-[1.06] saturate-[0.78] brightness-[0.94]"
								/>

								<div
									aria-hidden="true"
									className="absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-white via-white/30 to-transparent dark:from-[#09090B] dark:via-[#09090B]/45"
								/>

								<div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-4">
									<div className="min-w-0">
										<p className="truncate font-display text-[13px] font-bold text-ink">
											{t.hero.portraitName}{" "}
											<span className="font-medium text-muted">
												• {t.common.available}
											</span>
										</p>
										<p className="mt-1.5 flex items-center gap-1.5 text-[10px] font-medium text-muted">
											<span
												className="size-1.5 rounded-full bg-accent"
												aria-hidden="true"
											/>
											{t.hero.portraitRole}
										</p>
									</div>
									<span className="shrink-0 font-mono text-[8px] font-medium uppercase tracking-[0.16em] text-muted/80">
										{t.hero.portraitLabel}
									</span>
								</div>
							</div>
						</div>

						<div className="flex items-center justify-between gap-3 px-2 pb-1 pt-3">
							<span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-muted">
								<FiMapPin aria-hidden="true" className="size-3 text-accent-text" />
								{t.hero.location}
							</span>
							<span className="font-mono text-[8px] font-medium uppercase tracking-[0.16em] text-muted/70">
								EG / 26
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
