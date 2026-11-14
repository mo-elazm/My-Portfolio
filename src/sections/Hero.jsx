"use client";

import { useEffect, useRef, useState } from "react";
import { FiCheck, FiCopy, FiGithub, FiMapPin } from "react-icons/fi";
import { useTranslation } from "@/i18n";
import { gsap } from "@/lib/gsap";
import { profile } from "@/data/profile";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button";
import SocialLinks from "@/components/ui/SocialLinks";
import StatusPill from "@/components/ui/StatusPill";
import HeroVisual from "@/components/home/HeroVisual";

export default function Hero() {
	const { t, language } = useTranslation();
	const root = useRef(null);
	const timerRef = useRef(null);
	const [copied, setCopied] = useState(false);

	useEffect(() => () => window.clearTimeout(timerRef.current), []);

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return undefined;
		}

		const scope = root.current;

		if (!scope) {
			return undefined;
		}

		const context = gsap.context(() => {
			const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

			timeline
				.fromTo(
					".hero-pill",
					{ y: 16, autoAlpha: 0 },
					{ y: 0, autoAlpha: 1, duration: 0.5 },
				)
				.fromTo(
					".hero-line",
					{ yPercent: 110, y: 0 },
					{ yPercent: 0, y: 0, duration: 0.85, stagger: 0.09 },
					"-=0.2",
				)
				.fromTo(
					".hero-role",
					{ y: 14, autoAlpha: 0 },
					{ y: 0, autoAlpha: 1, duration: 0.5 },
					"-=0.45",
				)
				.fromTo(
					".hero-copy",
					{ y: 14, autoAlpha: 0 },
					{ y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.08 },
					"-=0.3",
				)
				.fromTo(
					".hero-cta",
					{ y: 16, autoAlpha: 0 },
					{ y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.07 },
					"-=0.3",
				)
				.fromTo(
					".hero-visual",
					{ y: 26, scale: 0.975, autoAlpha: 0 },
					{ y: 0, scale: 1, autoAlpha: 1, duration: 0.9 },
					"-=0.7",
				);
		}, scope);

		return () => context.revert();
	}, [language]);

	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText(profile.email);
		} catch {
			const field = document.createElement("textarea");
			field.value = profile.email;
			field.setAttribute("readonly", "");
			field.style.position = "fixed";
			field.style.opacity = "0";
			document.body.appendChild(field);
			field.select();
			document.execCommand("copy");
			document.body.removeChild(field);
		}

		setCopied(true);
		window.clearTimeout(timerRef.current);
		timerRef.current = window.setTimeout(() => setCopied(false), 2200);
	};

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

			<div className="container-shell relative grid items-center gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:gap-12 xl:gap-16">
				<div className="min-w-0 max-w-[680px]">
					<div className="hero-pill flex flex-wrap items-center gap-2.5">
						<StatusPill label={t.hero.badge} className="max-w-full text-start" />
						<span className="eyebrow-label">{t.hero.eyebrow}</span>
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

					<p className="hero-role mt-6 break-words font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent-text rtl:font-arabic rtl:tracking-normal">
						{t.hero.role}
					</p>

					<p className="hero-copy mt-4 max-w-[560px] text-pretty break-words text-[0.95rem] leading-7 text-muted sm:text-[1.05rem] sm:leading-8">
						{t.hero.description}
					</p>

					<div className="hero-cta mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
						<Button href="#work" className="w-full active:scale-[0.97] sm:w-auto">
							{t.hero.primaryCta}
						</Button>
						<Button
							href={profile.github}
							variant="secondary"
							icon={false}
							target="_blank"
							rel="noreferrer noopener"
							className="w-full active:scale-[0.97] sm:w-auto"
						>
							<FiGithub aria-hidden="true" className="size-3.5 shrink-0" />
							<span>{t.hero.githubCta}</span>
						</Button>
						<button
							type="button"
							onClick={copyEmail}
							aria-live="polite"
							className="btn btn-secondary group w-full active:scale-[0.97] sm:w-auto"
						>
							{copied ? (
								<FiCheck aria-hidden="true" className="size-3.5 shrink-0 text-accent-text" />
							) : (
								<FiCopy aria-hidden="true" className="size-3.5 shrink-0" />
							)}
							<span>{copied ? t.hero.copied : t.hero.copyEmail}</span>
						</button>
					</div>

					<div className="hero-copy mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6">
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

				<HeroVisual />
			</div>
		</section>
	);
}
