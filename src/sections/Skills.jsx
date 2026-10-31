import { FiCheck } from "react-icons/fi";
import { skillGroups } from "@/data/skills";
import { useTranslation } from "@/i18n";
import { cn } from "@/utils/cn";
import SectionHeading from "@/components/ui/SectionHeading";
import TechChip from "@/components/ui/TechChip";

export default function Skills() {
	const { t } = useTranslation();

	return (
		<section id="skills" className="section-pad relative border-t border-line/70 bg-surface/25">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute end-0 top-1/3 size-80 rounded-full bg-secondary/[0.055] blur-[110px]"
			/>

			<div className="container-shell relative">
				<div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
					<SectionHeading
						eyebrow={t.skills.eyebrow}
						number={t.skills.number}
						title={t.skills.title}
						description={t.skills.description}
					/>

					<div data-reveal className="flex shrink-0 items-center gap-3 lg:pb-2">
						<span className="grid size-9 place-items-center rounded-full border border-line bg-surface/60 text-lg text-accent-text">
							✳
						</span>
						<p className="max-w-[190px] text-[10px] font-semibold leading-4 text-muted">
							React · Next.js · Zustand · Laravel · Node.js
						</p>
					</div>
				</div>

				<div className="mt-12 grid gap-3.5 lg:grid-cols-12">
					{skillGroups.map((group, index) => {
						const Icon = group.icon;
						const content = t.skills.categories[group.id];
						const isState = group.id === "state";
						const isExploring = group.id === "exploring";

						return (
							<article
								key={group.id}
								data-reveal
								data-reveal-delay={index * 0.04}
								className={cn(
									"group glass-card card-sheen relative overflow-hidden rounded-[1.7rem] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-text/30 sm:p-6",
									group.span,
									isExploring && "lg:flex lg:items-center lg:justify-between lg:gap-10",
								)}
							>
								<span className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent-text/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
								<div
									aria-hidden="true"
									className="absolute -end-10 -top-12 size-36 rounded-full bg-accent/[0.035] blur-2xl transition-opacity duration-500 group-hover:bg-accent/[0.07]"
								/>

								<div className={cn("relative", isExploring && "max-w-lg")}>
									<div className="flex items-start justify-between gap-4">
										<span className="grid size-10 place-items-center rounded-xl border border-line bg-canvas/60 text-accent-text transition-transform duration-300 group-hover:-rotate-6">
											<Icon aria-hidden="true" className="size-5" />
										</span>
										<span className="font-mono text-[9px] font-semibold text-muted/60">
											/ {String(index + 1).padStart(2, "0")}
										</span>
									</div>

									<h3 className="mt-9 font-display text-xl font-semibold tracking-[-0.035em] text-ink sm:text-[1.4rem]">
										{content.title}
									</h3>
									<p className="mt-2 max-w-md text-pretty text-[11px] leading-5 text-muted sm:text-xs sm:leading-6">
										{content.note}
									</p>
								</div>

								{isState ? (
									<div className="relative mt-7 flex flex-col gap-6">
										<div className="flex items-center gap-4">
											<span className="grid size-[66px] shrink-0 place-items-center rounded-2xl bg-accent font-display text-3xl font-bold text-[#0a100b] shadow-[0_18px_40px_-24px_rgba(201,255,91,0.8)]">
												Z
											</span>
											<div>
												<p className="text-sm font-bold text-ink">Zustand</p>
												<p className="mt-1 font-mono text-[9px] uppercase tracking-[0.13em] text-muted">
													Global state · Persist
												</p>
											</div>
										</div>
										<ul className="space-y-2.5">
											{content.features.map((feature) => (
												<li
													key={feature}
													className="flex items-center gap-2.5 text-[11px] font-medium text-muted"
												>
													<FiCheck aria-hidden="true" className="size-3.5 shrink-0 text-accent-text" />
													{feature}
												</li>
											))}
										</ul>
									</div>
								) : (
									<div
										className={cn(
											"relative mt-7 flex flex-wrap gap-2",
											isExploring && "lg:mt-0 lg:max-w-[460px] lg:justify-end",
										)}
									>
										{group.techs.map((tech) => (
											<TechChip key={tech.name} tech={tech} />
										))}
									</div>
								)}

							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
