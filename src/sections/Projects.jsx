"use client";

import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { useTranslation } from "@/i18n";
import { cn } from "@/utils/cn";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ProjectPreview from "@/components/projects/ProjectPreview";

export default function Projects() {
	const { t } = useTranslation();

	return (
		<section id="work" className="section-pad relative border-t border-line">
			<div className="container-shell">
				<SectionHeading
					eyebrow={t.projects.eyebrow}
					number={t.projects.number}
					title={t.projects.title}
					description={t.projects.description}
				/>

				<div data-reveal-group className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{projects.map((project, index) => {
						const copy = t.projects.items[project.id];

						return (
							<SpotlightCard
								as="article"
								key={project.id}
								data-reveal-item
								className={cn(
									"group flex flex-col overflow-hidden rounded-[1.6rem]",
									index === projects.length - 1 && "md:col-span-2 lg:col-span-1",
								)}
							>
								<div className="p-2 pb-0">
									<div className="relative aspect-[16/10] overflow-hidden rounded-[1.15rem] border border-line bg-surface-2">
										<div
											dir="ltr"
											className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
										>
											<ProjectPreview variant={project.variant} />
										</div>
									</div>
								</div>

								<div className="flex flex-1 flex-col p-5 sm:p-6">
									<div className="flex items-center justify-between gap-3">
										<span className="eyebrow-label">{copy.category}</span>
										<span className="font-mono text-[10px] font-medium text-muted">
											{project.number}
										</span>
									</div>

									<h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.03em] text-ink rtl:tracking-normal">
										{copy.title}
									</h3>

									<p className="mt-2 line-clamp-3 text-pretty text-[13px] leading-6 text-muted">
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
											className="btn btn-primary min-h-9 px-4 text-[11px]"
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
											className="btn btn-secondary min-h-9 px-4 text-[11px]"
										>
											<FiGithub aria-hidden="true" className="size-3" />
											<span>{t.projects.source}</span>
										</a>
									</div>
								</div>
							</SpotlightCard>
						);
					})}

					<SpotlightCard
						data-reveal-item
						className="col-span-full flex flex-col gap-4 rounded-[1.6rem] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
					>
						<div className="flex min-w-0 items-center gap-4">
							<span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-accent-text">
								<FiGithub aria-hidden="true" className="size-[18px]" />
							</span>
							<div className="min-w-0">
								<h3 className="font-display text-lg font-bold tracking-[-0.02em] text-ink rtl:tracking-normal">
									{t.projects.more}
								</h3>
								<p className="mt-1 text-pretty text-[12px] leading-5 text-muted">
									{t.projects.moreText}
								</p>
							</div>
						</div>

						<a
							href={profile.github}
							target="_blank"
							rel="noreferrer noopener"
							className="btn btn-secondary group w-fit shrink-0"
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
		</section>
	);
}
