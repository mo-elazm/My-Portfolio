import { FiBriefcase, FiCalendar, FiCheck, FiUsers } from "react-icons/fi";
import { experience } from "@/data/experience";
import { useTranslation } from "@/i18n";
import { cn } from "@/utils/cn";
import SectionHeading from "@/components/ui/SectionHeading";

const icons = {
	mentor: FiUsers,
	intern: FiBriefcase,
};

export default function Experience() {
	const { t } = useTranslation();

	return (
		<section
			id="experience"
			className="section-pad relative border-t border-line/70 bg-surface/20"
		>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute end-[-6rem] top-[18%] size-[24rem] rounded-full bg-secondary/[0.055] blur-[120px]"
			/>

			<div className="container-shell relative">
				<div className="flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
					<SectionHeading
						eyebrow={t.experience.eyebrow}
						number={t.experience.number}
						title={t.experience.title}
						description={t.experience.description}
					/>

					<div
						data-reveal
						className="grid w-full max-w-[360px] shrink-0 grid-cols-3 gap-2 lg:pb-1"
					>
						{t.experience.stats.map((stat) => (
							<div
								key={stat.label}
								className="glass-chip rounded-2xl p-3 transition-colors hover:border-accent-text/30"
							>
								<p className="font-display text-xl font-semibold tracking-[-0.045em] text-ink sm:text-2xl">
									{stat.value}
								</p>
								<p className="mt-1 text-[9px] font-bold uppercase leading-4 tracking-[0.1em] text-muted">
									{stat.label}
								</p>
							</div>
						))}
					</div>
				</div>

				<ol className="relative mt-12 space-y-4 before:absolute before:bottom-8 before:start-[7px] before:top-8 before:w-px before:bg-line sm:before:start-[11px] lg:mt-16">
					{experience.map((item, index) => {
						const copy = t.experience.items[item.id];
						const Icon = icons[item.icon];

						return (
							<li
								key={item.id}
								data-reveal
								data-reveal-delay={index * 0.06}
								className="relative ps-7 sm:ps-12"
							>
								<span
									aria-hidden="true"
									className={cn(
										"absolute start-0 top-7 z-10 grid size-4 place-items-center rounded-full border-2 border-canvas bg-line-strong sm:size-6",
										item.current && "bg-accent",
									)}
								>
									{item.current ? (
										<span className="absolute inline-flex size-2 animate-ping rounded-full bg-accent opacity-40" />
									) : null}
								</span>

								<article className="group glass-card card-sheen relative overflow-hidden rounded-[1.8rem] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-text/25 sm:p-7">
									<span className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent-text/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
									<div
										aria-hidden="true"
										className="absolute -end-14 -top-16 size-44 rounded-full bg-accent/[0.035] blur-2xl transition-colors duration-500 group-hover:bg-accent/[0.07]"
									/>

									<div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
										<div className="flex min-w-0 items-start gap-4">
											<span className="hidden size-11 shrink-0 place-items-center rounded-2xl border border-line bg-canvas/70 text-accent-text sm:grid">
												<Icon aria-hidden="true" className="size-5" />
											</span>
											<div className="min-w-0">
												<div className="flex flex-wrap items-center gap-2.5">
													<span className="eyebrow-label">{copy.org}</span>
													{item.current ? (
														<span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-accent-text">
															<span
																aria-hidden="true"
																className="size-1 rounded-full bg-accent-text"
															/>
															{t.experience.current}
														</span>
													) : null}
												</div>
												<h3 className="mt-2 font-display text-[clamp(1.35rem,3.2vw,1.9rem)] font-semibold leading-tight tracking-[-0.04em] text-ink">
													{copy.role}
												</h3>
												<p className="mt-1.5 text-[11px] font-medium text-muted">
													{copy.type}
												</p>
											</div>
										</div>

										<div className="flex shrink-0 flex-row flex-wrap items-center gap-2 sm:flex-col sm:items-end">
											<span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas/60 px-3 py-1.5 font-mono text-[9px] font-semibold text-muted">
												<FiCalendar aria-hidden="true" className="size-3" />
												{copy.period}
											</span>
											<span className="rounded-full border border-line bg-canvas/60 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.12em] text-muted">
												{copy.note}
											</span>
										</div>
									</div>

									<p className="relative mt-5 max-w-2xl text-pretty text-[0.9rem] leading-7 text-muted">
										{copy.description}
									</p>

									<ul className="relative mt-5 grid gap-2.5 sm:grid-cols-2">
										{copy.highlights.map((highlight) => (
											<li
												key={highlight}
												className="flex items-start gap-2.5 text-[11px] leading-5 text-muted sm:text-xs sm:leading-6"
											>
												<span className="mt-1 grid size-4 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-text">
													<FiCheck aria-hidden="true" className="size-2.5" />
												</span>
												<span>{highlight}</span>
											</li>
										))}
									</ul>

									<div className="relative mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-4">
										{copy.tags.map((tag) => (
											<span
												key={tag}
												className="glass-chip rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.07em] text-muted"
											>
												{tag}
											</span>
										))}
									</div>
								</article>
							</li>
						);
					})}
				</ol>
			</div>
		</section>
	);
}
