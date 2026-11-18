"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { projectFilters, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { useTranslation } from "@/i18n";
import { Flip, ScrollTrigger, gsap } from "@/lib/gsap";
import { cn } from "@/utils/cn";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ProjectPreview from "@/components/projects/ProjectPreview";

const matchesFilter = (filter, active) => active === "all" || filter === active;

export default function Projects() {
	const { t } = useTranslation();
	const [filter, setFilter] = useState("all");
	const gridRef = useRef(null);
	const pendingFlip = useRef(null);

	// One-time, GPU-composited card reveals. No scrubbed transforms: each card
	// animates once on entry, then ScrollTrigger detaches completely.
	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return undefined;
		}

		const grid = gridRef.current;

		if (!grid) {
			return undefined;
		}

		const context = gsap.context(() => {
			const cards = gsap.utils.toArray("[data-card-entrance]", grid);

			if (!cards.length) {
				return;
			}

			gsap.set(cards, { y: 28, opacity: 0 });

			// Batch by viewport entry so each row cascades in once, then the
			// triggers detach for good.
			ScrollTrigger.batch(cards, {
				start: "top 92%",
				once: true,
				onEnter: (batch) =>
					gsap.to(batch, {
						y: 0,
						opacity: 1,
						duration: 0.65,
						ease: "power3.out",
						stagger: 0.08,
						overwrite: true,
					}),
			});
		}, grid);

		return () => context.revert();
	}, []);

	useLayoutEffect(() => {
		const state = pendingFlip.current;

		if (!state) {
			return;
		}

		pendingFlip.current = null;

		Flip.from(state, {
			duration: 0.65,
			ease: "power3.inOut",
			stagger: 0.06,
			absolute: true,
			onEnter: (elements) =>
				gsap.fromTo(
					elements,
					{ autoAlpha: 0, scale: 0.94, y: 14 },
					{
						autoAlpha: 1,
						scale: 1,
						y: 0,
						duration: 0.5,
						ease: "power3.out",
						delay: 0.05,
						clearProps: "transform",
					},
				),
			onComplete: () => ScrollTrigger.refresh(),
		});
	}, [filter]);

	const changeFilter = (next) => {
		if (next === filter) {
			return;
		}

		const grid = gridRef.current;

		if (!grid) {
			setFilter(next);
			return;
		}

		const items = Array.from(grid.querySelectorAll("[data-flip-item]"));
		const staying = items.filter((element) =>
			matchesFilter(element.dataset.filter, next),
		);
		const leaving = items.filter(
			(element) => !matchesFilter(element.dataset.filter, next),
		);
		const state = staying.length ? Flip.getState(staying) : null;

		const commit = () => {
			pendingFlip.current = state;
			setFilter(next);
		};

		if (!leaving.length) {
			commit();
			return;
		}

		gsap.to(leaving, {
			autoAlpha: 0,
			scale: 0.94,
			duration: 0.2,
			ease: "power2.in",
			onComplete: commit,
		});
	};

	return (
		<section id="work" className="section-pad relative border-t border-line">
			<div className="container-shell">
				<SectionHeading
					eyebrow={t.projects.eyebrow}
					number={t.projects.number}
					title={t.projects.title}
					description={t.projects.description}
				/>

				<div
					role="group"
					aria-label={t.projects.eyebrow}
					className="mt-8 flex flex-wrap items-center gap-2"
				>
					{projectFilters.map((id) => {
						const isActive = filter === id;

						return (
							<button
								key={id}
								type="button"
								onClick={() => changeFilter(id)}
								aria-pressed={isActive}
								className={cn(
									"inline-flex min-h-11 items-center rounded-full border px-4 text-[11px] font-semibold transition-colors duration-300 sm:min-h-9",
									isActive
										? "border-transparent bg-ink text-canvas"
										: "border-line bg-surface text-muted hover:border-line-strong hover:text-ink",
								)}
							>
								{t.projects.filters[id]}
							</button>
						);
					})}
				</div>

				<div
					ref={gridRef}
					className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
				>
					{projects.map((project) => {
						const copy = t.projects.items[project.id];
						const visible = matchesFilter(project.filter, filter);

						return (
							<div
								key={project.id}
								data-flip-item
								data-filter={project.filter}
								className={cn("min-w-0", !visible && "hidden")}
							>
								<div
									data-card-entrance
									className="h-full will-change-transform"
								>
									<SpotlightCard
										as="article"
										tilt
										tiltStrength={3.5}
										specular
										data-cursor="explore"
										className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[1.6rem]"
									>
										<div className="p-2 pb-0">
											<div className="relative aspect-[16/10] overflow-hidden rounded-[1.15rem] border border-line bg-surface-2">
												<div className="absolute inset-0">
													<div
														dir="ltr"
														className="size-full transition-transform duration-500 ease-out group-hover:scale-105"
													>
														<ProjectPreview variant={project.variant} />
													</div>
												</div>
											</div>
										</div>

										<div className="flex flex-1 flex-col p-5 sm:p-6">
											<div className="flex items-center justify-between gap-3">
												<span className="eyebrow-label truncate">
													{copy.category}
												</span>
												<span className="shrink-0 font-mono text-[10px] font-medium text-muted">
													{project.number}
												</span>
											</div>

											<h3 className="mt-3 break-words font-display text-[clamp(1.35rem,2.4vw,1.6rem)] font-bold tracking-[-0.03em] text-ink rtl:tracking-normal">
												{copy.title}
											</h3>

											<p className="mt-2 line-clamp-3 text-pretty break-words text-[13px] leading-6 text-muted">
												{copy.description}
											</p>

											<div className="mt-4 flex flex-wrap gap-1.5">
												{project.stack.map((tech) => (
													<span
														key={tech}
														className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[9px] font-medium text-muted"
													>
														{tech}
													</span>
												))}
											</div>

											<div className="mt-auto flex flex-wrap items-center gap-2 border-t border-line pt-4">
												<a
													href={project.url}
													target="_blank"
													rel="noreferrer noopener"
													className="btn btn-primary min-h-11 px-4 text-[11px] active:scale-[0.97] sm:min-h-9"
												>
													<span>{t.projects.live}</span>
													<FiArrowUpRight
														aria-hidden="true"
														className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
													/>
												</a>
												<a
													href={project.repo}
													target="_blank"
													rel="noreferrer noopener"
													aria-label={`${copy.title} — ${t.projects.source}`}
													className="btn btn-secondary min-h-11 px-4 text-[11px] active:scale-[0.97] sm:min-h-9"
												>
													<FiGithub aria-hidden="true" className="size-3" />
													<span>{t.projects.source}</span>
												</a>
											</div>
										</div>
									</SpotlightCard>
								</div>
							</div>
						);
					})}

					<div data-card-entrance className="col-span-full will-change-transform">
						<SpotlightCard
							specular
							className="flex h-full flex-col gap-4 rounded-[1.6rem] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
						>
							<div className="flex min-w-0 items-center gap-4">
								<span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-accent-text">
									<FiGithub aria-hidden="true" className="size-[18px]" />
								</span>
								<div className="min-w-0">
									<h3 className="break-words font-display text-lg font-bold tracking-[-0.02em] text-ink rtl:tracking-normal">
										{t.projects.more}
									</h3>
									<p className="mt-1 text-pretty break-words text-[12px] leading-5 text-muted">
										{t.projects.moreText}
									</p>
								</div>
							</div>

							<a
								href={profile.github}
								target="_blank"
								rel="noreferrer noopener"
								className="btn btn-secondary group w-fit shrink-0 active:scale-[0.97]"
							>
								<span>{t.projects.github}</span>
								<FiArrowUpRight
									aria-hidden="true"
									className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
								/>
							</a>
						</SpotlightCard>
					</div>
				</div>
			</div>
		</section>
	);
}
