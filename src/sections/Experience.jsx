"use client";

import { useEffect, useRef } from "react";
import { FiBriefcase, FiCalendar, FiCheck, FiUsers } from "react-icons/fi";
import { experience } from "@/data/experience";
import { useTranslation } from "@/i18n";
import { gsap } from "@/lib/gsap";
import { cn } from "@/utils/cn";
import CountUp from "@/components/ui/CountUp";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";

const icons = {
	mentor: FiUsers,
	intern: FiBriefcase,
};

export default function Experience() {
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
			gsap.fromTo(
				"[data-timeline-line]",
				{ scaleY: 0 },
				{
					scaleY: 1,
					ease: "none",
					transformOrigin: "top",
					scrollTrigger: {
						trigger: scope,
						start: "top 70%",
						end: "bottom 65%",
						scrub: 0.6,
					},
				},
			);
		}, scope);

		return () => context.revert();
	}, [language]);

	return (
		<section
			id="experience"
			ref={root}
			className="section-pad relative border-t border-line"
		>
			<div className="container-shell">
				<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
					<SectionHeading
						eyebrow={t.experience.eyebrow}
						number={t.experience.number}
						title={t.experience.title}
						description={t.experience.description}
					/>

					<div
						data-reveal
						className="grid w-full max-w-sm shrink-0 grid-cols-3 gap-2"
					>
						{t.experience.stats.map((stat) => (
							<div
								key={stat.label}
								className="rounded-2xl border border-line bg-surface p-3 shadow-[var(--card-shadow)]"
							>
								<CountUp
									value={stat.value}
									className="block font-display text-lg font-bold tracking-[-0.03em] text-ink sm:text-xl"
								/>
								<p className="mt-1 text-[9px] font-medium leading-4 text-muted">
									{stat.label}
								</p>
							</div>
						))}
					</div>
				</div>

				<div className="relative mt-12">
					<span
						aria-hidden="true"
						data-timeline-line
						className="absolute bottom-6 start-[15px] top-6 w-px origin-top scale-y-0 bg-accent/70"
					/>
					<ol className="space-y-4">
						{experience.map((item, index) => {
						const copy = t.experience.items[item.id];
						const Icon = icons[item.icon];

						return (
							<li
								key={item.id}
								data-reveal
								data-reveal-delay={index * 0.05}
								className="relative ps-12"
							>
								<span
									aria-hidden="true"
									className={cn(
										"absolute start-0 top-6 z-10 grid size-8 place-items-center rounded-full border border-line bg-surface text-accent-text",
										item.current && "border-accent/40",
									)}
								>
									<Icon className="size-3.5" />
									{item.current ? (
										<span className="absolute -end-0.5 -top-0.5 size-2 rounded-full bg-accent" />
									) : null}
								</span>

								<SpotlightCard className="rounded-[1.6rem] p-5 sm:p-7">
									<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
										<div className="min-w-0">
											<div className="flex flex-wrap items-center gap-2.5">
												<span className="eyebrow-label">{copy.org}</span>
												{item.current ? (
													<span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent-soft px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-accent-text">
														<span className="size-1 rounded-full bg-accent" aria-hidden="true" />
														{t.experience.current}
													</span>
												) : null}
											</div>

											<h3 className="mt-2.5 break-words font-display text-[clamp(1.2rem,2.6vw,1.6rem)] font-bold leading-tight tracking-[-0.03em] text-ink rtl:tracking-normal">
												{copy.role}
											</h3>
											<p className="mt-1.5 text-[11px] font-medium text-muted">
												{copy.type}
											</p>
										</div>

										<div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end">
											<span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3 py-1.5 font-mono text-[9px] font-medium text-muted">
												<FiCalendar aria-hidden="true" className="size-3" />
												{copy.period}
											</span>
											<span className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.1em] text-muted">
												{copy.note}
											</span>
										</div>
									</div>

									<p className="mt-4 max-w-2xl text-pretty break-words text-[13px] leading-6 text-muted sm:text-sm sm:leading-7">
										{copy.description}
									</p>

									<ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
										{copy.highlights.map((highlight) => (
											<li
												key={highlight}
												className="flex items-start gap-2.5 text-[11px] leading-5 text-muted sm:text-xs sm:leading-6"
											>
												<span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-text">
													<FiCheck aria-hidden="true" className="size-2.5" />
												</span>
												<span>{highlight}</span>
											</li>
										))}
									</ul>

									<div className="mt-5 flex flex-wrap items-center gap-1.5 border-t border-line pt-4">
										{copy.tags.map((tag) => (
											<span
												key={tag}
												className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[9px] font-medium text-muted"
											>
												{tag}
											</span>
										))}
									</div>
								</SpotlightCard>
							</li>
						);
					})}
					</ol>
				</div>
			</div>
		</section>
	);
}
