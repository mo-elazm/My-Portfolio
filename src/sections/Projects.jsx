import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { useTranslation } from "@/i18n";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectPreview from "@/components/projects/ProjectPreview";

export default function Projects() {
	const { t, isRTL } = useTranslation();

	return (
		<section id="work" className="section-pad relative border-t border-line/70">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute start-[-8rem] top-[28%] size-96 rounded-full bg-accent/[0.045] blur-[120px]"
			/>

			<div className="container-shell relative">
				<div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
					<SectionHeading
						eyebrow={t.projects.eyebrow}
						number={t.projects.number}
						title={t.projects.title}
						description={t.projects.description}
					/>

					<div data-reveal className="shrink-0 lg:pb-1">
						<Button
							href={profile.github}
							target="_blank"
							rel="noreferrer noopener"
							variant="secondary"
							icon={false}
						>
							<span className="inline-flex items-center gap-2">
								<FiGithub aria-hidden="true" className="size-4" />
								{t.projects.github}
								<FiArrowUpRight
									aria-hidden="true"
									className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
								/>
							</span>
						</Button>
					</div>
				</div>

				<div className="mt-14 space-y-20 sm:space-y-24 lg:mt-20 lg:space-y-32">
					{projects.map((project, index) => {
						const copy = t.projects.items[project.id];
						const reversed = index % 2 === 1;

						return (
							<article
								key={project.id}
								data-reveal
								className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-14 xl:gap-20"
							>
								<div className={cn("relative", reversed && "lg:order-2")}>
									<div
										aria-hidden="true"
										className="absolute -inset-4 rounded-[2.5rem] bg-accent/[0.045] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
									/>
									<span className="absolute -top-3 start-6 z-10 inline-flex items-center gap-2 rounded-full border border-line bg-canvas px-3 py-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-muted shadow-sm">
										<span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
										{project.number} / {t.projects.featured}
									</span>

									<div className="card-sheen relative overflow-hidden rounded-[1.85rem] border border-line/70 bg-surface/80 p-2 shadow-[var(--card-shadow)] backdrop-blur-xl transition-transform duration-500 group-hover:-translate-y-1">
										<div className="aspect-[4/3] overflow-hidden rounded-[1.35rem]">
											<ProjectPreview variant={project.variant} />
										</div>
									</div>
								</div>

								<div className={cn("max-w-xl", reversed && "lg:order-1")}>
									<div className="flex items-center gap-3">
										<span className="font-mono text-[10px] font-bold text-accent-text">
											{project.number}
										</span>
										<span className="h-px w-8 bg-line-strong" aria-hidden="true" />
										<span className="eyebrow-label">{copy.category}</span>
									</div>

									<h3 className="mt-5 font-display text-[clamp(2.6rem,6vw,4.6rem)] font-semibold leading-none tracking-[-0.065em] text-ink rtl:tracking-[-0.03em]">
										{copy.title}
									</h3>

									<p className="mt-5 max-w-lg text-pretty text-[0.95rem] leading-7 text-muted sm:text-base sm:leading-8">
										{copy.description}
									</p>

									<div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
										{project.stack.map((tech) => (
											<span
												key={tech}
												className="rounded-full border border-line bg-surface/50 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-muted"
											>
												{tech}
											</span>
										))}
									</div>

									<div className="mt-7 flex flex-wrap items-center gap-3">
										<a
											href={project.url}
											target="_blank"
											rel="noreferrer noopener"
											className="group/live inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-[11px] font-bold text-[#0a100b] transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:text-canvas"
										>
											<span>{t.projects.live}</span>
											<FiArrowUpRight
												aria-hidden="true"
												className="size-3.5 transition-transform duration-300 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5 rtl:-scale-x-100"
											/>
										</a>
										<a
											href={project.repo}
											target="_blank"
											rel="noreferrer noopener"
											className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-5 py-3 text-[11px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-text/40 hover:text-accent-text"
										>
											<FiGithub aria-hidden="true" className="size-3.5" />
											<span>{t.projects.source}</span>
										</a>
									</div>

									{isRTL ? null : (
										<p className="mt-6 font-mono text-[8px] uppercase tracking-[0.18em] text-muted/55">
											DESIGN → DEVELOP → DEPLOY
										</p>
									)}
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
