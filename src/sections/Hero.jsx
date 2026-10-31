import { useRef } from "react";
import { FiMapPin } from "react-icons/fi";
import { SiLaravel, SiNextdotjs, SiNodedotjs, SiReact } from "react-icons/si";
import { useTranslation } from "@/i18n";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/profile";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button";
import SocialLinks from "@/components/ui/SocialLinks";
import StatusPill from "@/components/ui/StatusPill";

const stack = [
	{ label: "React", icon: SiReact },
	{ label: "Next.js", icon: SiNextdotjs },
	{ label: "Laravel", icon: SiLaravel },
	{ label: "Node.js", icon: SiNodedotjs },
];

function OrbitLabel({ label }) {
	return (
		<div className="animate-spin-slow size-[94px]">
			<svg viewBox="0 0 100 100" className="size-full" aria-hidden="true">
				<defs>
					<path
						id="hero-orbit-path"
						d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
					/>
				</defs>
				<text
					fill="rgba(241,243,236,0.44)"
					fontSize="6.2"
					fontFamily="Manrope, sans-serif"
					fontWeight="700"
					letterSpacing="1.9"
				>
					<textPath href="#hero-orbit-path">{label}</textPath>
				</text>
				<circle cx="50" cy="50" r="25" fill="none" stroke="rgba(201,255,91,0.25)" />
				<circle cx="50" cy="50" r="3" fill="#c9ff5b" />
			</svg>
		</div>
	);
}

export default function Hero() {
	const { t, isRTL, language } = useTranslation();
	const root = useRef(null);

	useGSAP(
		() => {
			const media = gsap.matchMedia();

			media.add("(prefers-reduced-motion: no-preference)", () => {
				const timeline = gsap.timeline({
					defaults: { ease: "power4.out" },
				});

				timeline
					.from(".hero-kicker", { y: 18, autoAlpha: 0, duration: 0.7 })
					.from(
						".hero-line-inner",
						{ yPercent: 115, duration: 1.05, stagger: 0.09 },
						"-=0.3",
					)
					.from(".hero-sub", { y: 22, autoAlpha: 0, duration: 0.75 }, "-=0.66")
					.from(".hero-actions", { y: 18, autoAlpha: 0, duration: 0.7 }, "-=0.52")
					.from(".hero-meta", { y: 16, autoAlpha: 0, duration: 0.6 }, "-=0.48")
					.from(
						".hero-visual",
						{ autoAlpha: 0, y: 34, scale: 0.96, rotate: 1.5, duration: 1.1 },
						"-=1.05",
					)
					.from(
						".hero-float",
						{ autoAlpha: 0, scale: 0.8, stagger: 0.12, duration: 0.6, ease: "back.out(1.7)" },
						"-=0.58",
					);

				gsap.to(".hero-glow-a", {
					x: 24,
					y: -18,
					duration: 7,
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
				});

				gsap.to(".hero-glow-b", {
					x: -20,
					y: 14,
					duration: 8,
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
				});

				const area = root.current;
				const plane = area?.querySelector(".hero-visual-plane");

				if (!area || !plane) {
					return undefined;
				}

				const onMove = (event) => {
					if (window.innerWidth < 1024) {
						return;
					}

					const rect = area.getBoundingClientRect();
					const x = (event.clientX - rect.left) / rect.width - 0.5;
					const y = (event.clientY - rect.top) / rect.height - 0.5;

					gsap.to(plane, {
						rotateX: -y * 5,
						rotateY: x * 6,
						transformPerspective: 1200,
						duration: 0.8,
						ease: "power2.out",
					});
				};

				const onLeave = () => {
					gsap.to(plane, {
						rotateX: 0,
						rotateY: 0,
						duration: 1,
						ease: "power3.out",
					});
				};

				area.addEventListener("mousemove", onMove);
				area.addEventListener("mouseleave", onLeave);

				return () => {
					area.removeEventListener("mousemove", onMove);
					area.removeEventListener("mouseleave", onLeave);
				};
			});

			return () => media.revert();
		},
		{ scope: root, dependencies: [language] },
	);

	return (
		<section
			id="home"
			ref={root}
			className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:min-h-[100svh] lg:pb-24 lg:pt-32"
		>
			<div className="visual-grid pointer-events-none absolute inset-x-0 top-0 h-[78vh] opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
			<div className="hero-glow-a pointer-events-none absolute -start-24 top-24 size-72 rounded-full bg-accent/15 blur-[110px] sm:size-96" />
			<div className="hero-glow-b pointer-events-none absolute end-[-5rem] top-[38%] size-72 rounded-full bg-secondary/10 blur-[120px] sm:size-[28rem]" />

			<div className="container-shell relative grid items-center gap-14 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-[1.06fr_0.94fr] lg:gap-10 xl:gap-16">
				<div className="min-w-0 max-w-[700px]">
					<div className="hero-kicker flex flex-wrap items-center gap-3 sm:gap-4">
						<StatusPill label={t.hero.available} />
						<span className="hidden h-4 w-px bg-line-strong sm:block" aria-hidden="true" />
						<span className="eyebrow-label">{t.hero.eyebrow}</span>
					</div>

					<h1 className="mt-7 font-display text-[clamp(3rem,8.2vw,6.15rem)] font-semibold leading-[0.89] tracking-[-0.07em] text-ink rtl:leading-[1.06] rtl:tracking-[-0.035em] sm:mt-8">
						{t.hero.headline.map((line, index) => {
							const accent = index === 2;
							return (
								<span key={line} className="block overflow-hidden pb-[0.06em]">
									<span
										className={cn(
											"hero-line-inner block",
											accent && "text-accent-text",
											accent && !isRTL && "font-serif font-normal italic tracking-[-0.045em]",
										)}
									>
										{line}
									</span>
								</span>
							);
						})}
					</h1>

					<div className="hero-sub mt-7 max-w-[590px] sm:mt-8">
						<p className="text-pretty text-[0.98rem] leading-7 text-muted sm:text-[1.08rem] sm:leading-8">
							{t.hero.description}
						</p>
						<p className="mt-5 flex items-center gap-2.5 text-[11px] font-semibold text-muted">
							<span className="relative flex size-2 shrink-0">
								<span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-40" />
								<span className="relative inline-flex size-2 rounded-full bg-accent" />
							</span>
							<span>{t.hero.currently}</span>
						</p>
					</div>

					<div className="hero-actions mt-8 flex flex-wrap items-center gap-3 sm:mt-9">
						<Button href="#work">{t.hero.primaryCta}</Button>
						<Button href="#contact" variant="secondary">
							{t.hero.secondaryCta}
						</Button>
					</div>

					<div className="hero-meta mt-9 flex flex-wrap items-center gap-5 border-t border-line pt-6 sm:mt-10">
						<SocialLinks />
						<span className="hidden h-px flex-1 bg-line sm:block" aria-hidden="true" />
						<a
							href="#about"
							className="group inline-flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink"
						>
							<span>{t.hero.scroll}</span>
							<span className="grid size-6 place-items-center rounded-full border border-line transition-colors group-hover:border-accent-text/50 group-hover:text-accent-text">
								<span aria-hidden="true" className="text-sm leading-none">↓</span>
							</span>
						</a>
					</div>
				</div>

				<div className="hero-visual relative mx-auto w-full max-w-[480px] lg:max-w-[490px]">
					<div className="hero-visual-plane relative" style={{ transformStyle: "preserve-3d" }}>
						<div
							aria-hidden="true"
							className="absolute inset-x-8 -bottom-4 top-8 rotate-[6deg] rounded-[2.4rem] border border-accent/25 bg-accent/[0.055]"
						/>
						<div
							aria-hidden="true"
							className="absolute inset-x-5 bottom-2 top-4 -rotate-[3deg] rounded-[2.35rem] border border-line bg-surface-2/70"
						/>

						<div className="hero-visual-card relative overflow-hidden rounded-[2.15rem] border border-white/10 bg-surface/80 p-2 backdrop-blur-xl">
							<div className="relative overflow-hidden rounded-[1.7rem] bg-[#0a100c] p-5 text-[#f1f3ec] sm:p-6">
								<div className="visual-grid-sm absolute inset-0 opacity-50" aria-hidden="true" />
								<div
									aria-hidden="true"
									className="absolute -end-20 -top-24 size-60 rounded-full bg-accent/15 blur-[70px]"
								/>

								<div className="relative flex items-center justify-between gap-3">
									<p className="font-mono text-[8px] font-semibold uppercase tracking-[0.24em] text-white/35">
										PORTFOLIO / 2026
									</p>
									<StatusPill label={t.hero.card.status} light />
								</div>

								<div className="relative mt-7 flex items-start justify-between gap-4">
									<div className="min-w-0">
										<p className="font-mono text-[8px] font-semibold uppercase tracking-[0.23em] text-white/40">
											{t.hero.card.intro}
										</p>
										<p className="mt-2 font-display text-[clamp(1.6rem,5vw,2.15rem)] font-semibold leading-none tracking-[-0.05em]">
											{t.hero.card.name}
										</p>
										<p className="mt-2 text-[11px] font-medium text-white/50">
											{t.hero.card.role}
										</p>
									</div>

									<div className="relative w-[86px] shrink-0 sm:w-[94px]">
										<div
											aria-hidden="true"
											className="absolute -inset-1 rounded-[1.35rem] border border-dashed border-accent/30"
										/>
										<div className="relative overflow-hidden rounded-[1.05rem] border border-white/10 bg-white/[0.045] p-1">
											<img
												src={profile.portrait}
												alt={t.about.profile.alt}
												width={1200}
												height={1200}
												loading="eager"
												fetchPriority="high"
												decoding="async"
												className="block aspect-square w-full rounded-[0.8rem] object-contain"
											/>
										</div>
										<span className="absolute -bottom-1 -end-1 size-3 rounded-full border-2 border-[#0a100c] bg-accent" />
									</div>
								</div>

								<div className="relative mt-7 overflow-hidden rounded-[1.3rem] border border-white/10 bg-white/[0.035] p-4">
									<div
										aria-hidden="true"
										className="absolute -bottom-16 -end-10 size-44 rounded-full bg-secondary/10 blur-3xl"
									/>
									<div className="relative flex items-end justify-between gap-4">
										<div>
											<p className="font-display text-[4.5rem] font-bold leading-[0.7] tracking-[-0.1em] text-white/[0.08]">
												{t.hero.card.monogram}
											</p>
											<div className="-mt-1">
												<p className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/35">
													{t.hero.card.focusLabel}
												</p>
												<p className="mt-1.5 text-[13px] font-semibold text-white/85">
													{t.hero.card.focusValue}
												</p>
											</div>
										</div>
										<OrbitLabel label={t.hero.card.orbit} />
									</div>
								</div>

								<div className="relative mt-3 rounded-[1.2rem] border border-white/10 bg-white/[0.035] px-4 py-3">
									<div className="flex items-center justify-between gap-3">
										<div>
											<p className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/35">
												{t.hero.card.stackLabel}
											</p>
											<p className="mt-1 font-mono text-[9px] text-white/55">
												React · Next · Laravel · Node
											</p>
										</div>
										<div className="flex items-center gap-1.5">
											{stack.map(({ label, icon: Icon }) => (
												<span
													key={label}
													title={label}
													className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-white/60 transition-colors hover:border-accent/30 hover:text-accent"
												>
													<Icon aria-hidden="true" className="size-3.5" />
												</span>
											))}
										</div>
									</div>
								</div>

								<div className="relative mt-4 flex items-center justify-between gap-3 font-mono text-[8px] uppercase tracking-[0.17em] text-white/30">
									<span className="inline-flex items-center gap-1.5">
										<FiMapPin aria-hidden="true" className="size-3" />
										{t.hero.card.location}
									</span>
									<span>SCROLL / 01</span>
								</div>
							</div>
						</div>

						<div className="hero-float glass-panel absolute -start-4 bottom-24 z-20 hidden items-center gap-2.5 rounded-2xl px-4 py-3 text-[10px] font-bold text-ink sm:flex lg:-start-8">
							<span className="grid size-7 place-items-center rounded-full bg-accent-soft text-accent-text">
								<FiMapPin aria-hidden="true" className="size-3.5" />
							</span>
							<span>{t.hero.card.location}</span>
						</div>

						<div className="hero-float glass-panel absolute -end-3 top-28 z-20 hidden items-center gap-2.5 rounded-2xl px-4 py-3 text-[10px] font-bold text-ink sm:flex lg:-end-6">
							<span className="flex items-center gap-1 text-accent-text">
								<SiReact aria-hidden="true" className="size-4" />
								<span className="text-ink/25">+</span>
								<SiLaravel aria-hidden="true" className="size-4" />
							</span>
							<span>React · Laravel</span>
						</div>
					</div>

					<div
						aria-hidden="true"
						className="absolute -bottom-10 start-1/2 size-52 -translate-x-1/2 rounded-full bg-accent/10 blur-[70px]"
					/>
				</div>
			</div>
		</section>
	);
}
