import { useEffect, useRef } from "react";
import { FiMapPin } from "react-icons/fi";
import { useTranslation } from "@/i18n";
import { gsap } from "@/lib/gsap";
import { profile } from "@/data/profile";
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

		const context = gsap.context(() => {
			gsap.fromTo(
				".hero-anim",
				{ y: 24, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.75,
					ease: "power3.out",
					stagger: 0.09,
					clearProps: "transform",
				},
			);
		}, root);

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
				className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[72vh] opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]"
			/>
			<div
				aria-hidden="true"
				className="spotlight-bg pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
			/>

			<div className="container-shell relative grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12 xl:gap-16">
				<div className="min-w-0 max-w-[660px]">
					<div className="hero-anim flex flex-wrap items-center gap-3">
						<StatusPill label={t.hero.badge} />
						<span className="eyebrow-label">{t.hero.eyebrow}</span>
					</div>

					<h1 className="mt-7 font-display text-[clamp(2.8rem,6.2vw,5.35rem)] font-extrabold leading-[1.02] tracking-[-0.05em] text-ink rtl:leading-[1.18] rtl:tracking-[-0.02em] sm:mt-8">
						{t.hero.title.map((line) => (
							<span key={line} className="hero-anim block">
								{line}
							</span>
						))}
					</h1>

					<p className="hero-anim mt-6 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent-text rtl:font-arabic rtl:tracking-normal">
						{t.hero.role}
					</p>

					<p className="hero-anim mt-4 max-w-[540px] text-pretty text-[0.98rem] leading-7 text-muted sm:text-[1.05rem] sm:leading-8">
						{t.hero.description}
					</p>

					<div className="hero-anim mt-8 flex flex-wrap items-center gap-3">
						<Button href="#work">{t.hero.primaryCta}</Button>
						<Button href="#contact" variant="secondary">
							{t.hero.secondaryCta}
						</Button>
					</div>

					<div className="hero-anim mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6">
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

				<div className="hero-anim relative mx-auto w-full max-w-[430px] lg:max-w-[440px]">
					<div
						aria-hidden="true"
						className="absolute -inset-6 rounded-[3rem] bg-accent/[0.07] blur-3xl"
					/>

					<div className="relative rounded-[2rem] border border-line bg-surface p-2 shadow-[var(--card-shadow)]">
						<div className="relative overflow-hidden rounded-[1.55rem] border border-line bg-surface-2">
							<div
								aria-hidden="true"
								className="dot-grid-sm absolute inset-0 opacity-40"
							/>
							<img
								src={profile.portrait}
								alt={t.about.portraitAlt}
								width={1200}
								height={1200}
								loading="eager"
								fetchPriority="high"
								decoding="async"
								className="relative block aspect-square w-full object-contain"
							/>
						</div>

						<div className="flex items-end justify-between gap-3 px-2 pb-1 pt-3.5">
							<div className="min-w-0">
								<p className="font-mono text-[8px] font-medium uppercase tracking-[0.16em] text-muted/80">
									{t.hero.portraitLabel}
								</p>
								<p className="mt-1.5 truncate font-display text-base font-bold tracking-[-0.02em] text-ink">
									{t.hero.portraitName}
								</p>
								<p className="mt-0.5 truncate text-[11px] font-medium text-muted">
									{t.hero.portraitRole}
								</p>
							</div>
							<span className="mb-0.5 size-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
