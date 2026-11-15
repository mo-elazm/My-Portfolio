"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { FiGithub, FiMapPin } from "react-icons/fi";
import { useTranslation } from "@/i18n";
import { gsap } from "@/lib/gsap";
import { profile } from "@/data/profile";
import useAppStore from "@/store/useAppStore";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button";
import CairoClock from "@/components/ui/CairoClock";
import SocialLinks from "@/components/ui/SocialLinks";
import StatusPill from "@/components/ui/StatusPill";

export default function Hero() {
	const { t, language } = useTranslation();
	const introDone = useAppStore((state) => state.introDone);
	const root = useRef(null);

	useEffect(() => {
		if (!introDone) {
			return undefined;
		}

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
					{ y: 14, autoAlpha: 0 },
					{ y: 0, autoAlpha: 1, duration: 0.5 },
					"-=0.45",
				)
				.fromTo(
					".hero-subtitle",
					{ y: 16, autoAlpha: 0 },
					{ y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.06 },
					"-=0.35",
				)
				.fromTo(
					".hero-cta",
					{ y: 16, autoAlpha: 0 },
					{ y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08 },
					"-=0.35",
				)
				.fromTo(
					".hero-portrait",
					{ scale: 0.96, autoAlpha: 0 },
					{ scale: 1, autoAlpha: 1, duration: 0.9, ease: "power3.out" },
					"-=0.55",
				);
		}, scope);

		return () => context.revert();
	}, [introDone, language]);

	return (
		<section
			id="home"
			ref={root}
			className="relative min-h-[100dvh] overflow-x-clip pb-16 pt-28 sm:pb-20 sm:pt-32 lg:flex lg:items-center lg:pb-24 lg:pt-32"
		>
			<div
				aria-hidden="true"
				className="ambient-mesh pointer-events-none absolute inset-0 opacity-80"
			/>
			<div
				aria-hidden="true"
				className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[72vh] opacity-[0.03] [mask-image:linear-gradient(to_bottom,black,transparent)] dark:opacity-[0.035]"
			/>

			<div className="container-shell relative z-10 grid items-center gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:gap-12 xl:gap-16">
				<div className="min-w-0 max-w-[680px]">
					<div className="hero-pill flex flex-wrap items-center gap-2.5">
						<StatusPill label={t.hero.badge} className="max-w-full text-start" />
						<CairoClock className="rounded-full border border-line bg-surface px-3 py-1.5" />
						<span className="eyebrow-label hidden sm:inline">{t.hero.eyebrow}</span>
					</div>

					<h1 className="mt-7 font-display text-[clamp(2.1rem,5.2vw,4.35rem)] font-extrabold leading-[1.04] tracking-[-0.045em] text-ink rtl:text-[clamp(2rem,4.9vw,4rem)] rtl:leading-[1.18] rtl:tracking-[-0.02em] sm:mt-8">
						{t.hero.title.map((line, index) => (
							<span key={line} className="hero-line-mask">
								<span
									className={cn(
										"hero-line",
										index === t.hero.title.length - 1 && "text-gradient",
									)}
								>
									{line}
								</span>
							</span>
						))}
					</h1>

					<p className="hero-subtitle mt-6 break-words font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent-text rtl:font-arabic rtl:tracking-normal">
						{t.hero.role}
					</p>

					<p className="hero-subtitle mt-4 max-w-[560px] text-pretty break-words text-[0.95rem] leading-7 text-muted sm:text-[1.05rem] sm:leading-8">
						{t.hero.description}
					</p>

					<div className="hero-cta mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
						<Button href="#work" className="w-full active:scale-[0.97] sm:w-auto">
							{t.hero.primaryCta}
						</Button>
						<Button
							href="#contact"
							variant="secondary"
							className="w-full active:scale-[0.97] sm:w-auto"
						>
							{t.hero.secondaryCta}
						</Button>
						<a
							href={profile.github}
							target="_blank"
							rel="noreferrer noopener"
							aria-label={t.common.viewGitHub}
							title={t.common.viewGitHub}
							className="icon-btn hidden size-11 shrink-0 active:scale-[0.94] sm:inline-flex"
						>
							<FiGithub aria-hidden="true" className="size-4" />
						</a>
					</div>

					<div className="hero-subtitle mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6">
						<SocialLinks />
						<span className="hidden h-4 w-px bg-line-strong sm:block" aria-hidden="true" />
						<span className="inline-flex min-w-0 items-center gap-1.5 text-[11px] font-medium text-muted">
							<FiMapPin aria-hidden="true" className="size-3.5 shrink-0 text-accent-text" />
							<span className="break-words">{t.hero.location}</span>
						</span>
						<span className="hidden text-[11px] text-muted/70 md:inline">
							{t.hero.note}
						</span>
					</div>
				</div>

				<div className="hero-portrait relative isolate mx-auto w-full max-w-[430px] lg:max-w-[440px]">
					<div
						aria-hidden="true"
						className="absolute -inset-6 -z-20 rounded-[3rem] bg-indigo-600/[0.06] blur-2xl dark:bg-indigo-500/20"
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
									className="object-cover object-top contrast-[1.05] saturate-[0.82]"
								/>

								<div
									aria-hidden="true"
									className="absolute inset-x-0 bottom-0 hidden h-[52%] bg-gradient-to-t from-[#09090B] via-[#09090B]/45 to-transparent dark:block"
								/>

								<div className="absolute inset-x-0 bottom-0 z-10 hidden items-end justify-between gap-3 p-4 dark:flex">
									<div className="min-w-0">
										<p className="truncate font-display text-[13px] font-bold text-ink">
											{t.hero.portraitName}{" "}
											<span className="font-medium text-muted">
												· {t.common.available}
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

						<div className="flex items-start justify-between gap-3 px-2 pb-0.5 pt-3 dark:hidden">
							<div className="min-w-0">
								<p className="truncate font-display text-[13px] font-bold text-ink">
									{t.hero.portraitName}{" "}
									<span className="font-medium text-muted">
										· {t.common.available}
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
							<span className="shrink-0 pt-0.5 font-mono text-[8px] font-medium uppercase tracking-[0.16em] text-muted/80">
								{t.hero.portraitLabel}
							</span>
						</div>

						<div className="flex items-center justify-between gap-3 px-2 pb-1 pt-3">
							<span className="inline-flex min-w-0 items-center gap-1.5 text-[10px] font-medium text-muted">
								<FiMapPin aria-hidden="true" className="size-3 shrink-0 text-accent-text" />
								<span className="truncate">{t.hero.location}</span>
							</span>
							<span className="shrink-0 font-mono text-[8px] font-medium uppercase tracking-[0.16em] text-muted/70">
								EG / 26
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
