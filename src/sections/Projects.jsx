import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { useTranslation } from "@/i18n";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectPreview from "@/components/projects/ProjectPreview";

export default function Projects() {
	const { t } = useTranslation();

	return (
		<section id="work" className="section-pad relative border-t border-line">
			<div className="container-shell">
				<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
					<SectionHeading
						eyebrow={t.projects.eyebrow}
						number={t.projects.number}
						title={t.projects.title}
						description={t.projects.description}
					/>

					<a
						href={profile.github}
						target="_blank"
						rel="noreferrer noopener"
						className="btn btn-secondary w-fit shrink-0"
					>
						<FiGithub aria-hidden="true" className="size-3.5" />
						<span>{t.projects.github}</span>
					</a>
				</div>

				<div data-reveal-group className="mt-12 grid gap-4 md:grid-cols-2">
					{projects.map((project) => {
						const copy = t.projects.items[project.id];

						return (
							<article
								key={project.id}
								data-reveal-item
								className="group flex flex-col overflow-hidden rounded-[1.6rem] border border-line bg-surface shadow-[var(--card-shadow)] transition-[translate,border-color] duration-500 hover:-translate-y-1 hover:border-line-strong"
							>
								<div className="p-2 pb-0">
									<div className="relative aspect-[16/10] overflow-hidden rounded-[1.15rem] border border-line bg-surface-2">
										<div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
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

									<p className="mt-2 line-clamp-2 text-pretty text-[13px] leading-6 text-muted">
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
							</article>
						);
					})}

					<article
						data-reveal-item
						className="relative flex flex-col justify-center overflow-hidden rounded-[1.6rem] border border-line bg-surface p-6 shadow-[var(--card-shadow)] sm:p-8"
					>
						<div
							aria-hidden="true"
							className="dot-grid-sm pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_80%_80%_at_100%_0%,black,transparent)]"
						/>
						<FiGithub
							aria-hidden="true"
							className="pointer-events-none absolute -bottom-6 -end-6 size-44 text-ink/[0.035] rtl:-scale-x-100"
						/>
						<div className="relative">
							<span className="grid size-10 place-items-center rounded-xl border border-line bg-surface-2 text-accent-text">
								<FiGithub aria-hidden="true" className="size-4" />
							</span>
							<h3 className="mt-5 font-display text-xl font-bold tracking-[-0.02em] text-ink rtl:tracking-normal">
								{t.projects.more}
							</h3>
							<p className="mt-2 max-w-xs text-pretty text-[13px] leading-6 text-muted">
								{t.projects.moreText}
							</p>
						</div>

						<a
							href={profile.github}
							target="_blank"
							rel="noreferrer noopener"
							className="btn btn-secondary relative mt-6 w-fit"
						>
							<span>{t.projects.github}</span>
							<FiArrowUpRight
								aria-hidden="true"
								className="size-3.5 rtl:-scale-x-100"
							/>
						</a>
					</article>
				</div>
			</div>
		</section>
	);
}
