"use client";

import { stackCategories } from "@/data/skills";
import { useTranslation } from "@/i18n";
import { cn } from "@/utils/cn";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import TechChip from "@/components/ui/TechChip";

export default function Skills() {
	const { t } = useTranslation();

	return (
		<section id="skills" className="section-pad relative border-t border-line">
			<div className="container-shell">
				<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
					<SectionHeading
						eyebrow={t.skills.eyebrow}
						number={t.skills.number}
						title={t.skills.title}
						description={t.skills.description}
					/>

					<div
						data-reveal
						className="w-full max-w-xs shrink-0 rounded-2xl border border-line bg-surface p-4 shadow-[var(--card-shadow)]"
					>
						<p className="eyebrow-label">{t.skills.coreLabel}</p>
						<p className="mt-2 break-words font-mono text-[11px] leading-5 text-ink">
							{t.skills.coreValue}
						</p>
					</div>
				</div>

				<div data-reveal-group className="mt-12 grid gap-3 lg:grid-cols-12">
					{stackCategories.map((group, index) => {
						const Icon = group.icon;
						const content = t.skills.categories[group.id];
						const isExploring = group.id === "exploring";

						return (
							<SpotlightCard
								key={group.id}
								data-reveal-item
								className={cn(
									"flex min-w-0 flex-col rounded-[1.6rem] p-5 sm:p-6",
									group.span,
									isExploring && "lg:flex-row lg:items-center lg:justify-between lg:gap-10",
								)}
							>
								<div className={cn("min-w-0", isExploring && "lg:max-w-md")}>
									<div className="flex items-center justify-between gap-4">
										<span className="grid size-9 place-items-center rounded-xl border border-line bg-surface-2 text-accent-text">
											<Icon aria-hidden="true" className="size-[18px]" />
										</span>
										<span className="font-mono text-[9px] font-medium text-muted/70">
											{String(index + 1).padStart(2, "0")}
										</span>
									</div>

									<h3 className="mt-6 break-words font-display text-lg font-bold tracking-[-0.02em] text-ink rtl:tracking-normal">
										{content.title}
									</h3>
									<p className="mt-1.5 max-w-md text-pretty break-words text-[12px] leading-6 text-muted">
										{content.note}
									</p>
								</div>

								<div
									className={cn(
										"mt-6 flex flex-wrap gap-1.5",
										isExploring && "lg:mt-0 lg:max-w-[430px] lg:justify-end",
									)}
								>
									{group.techs.map((tech) => (
										<TechChip key={tech.name} tech={tech} />
									))}
								</div>
							</SpotlightCard>
						);
					})}
				</div>
			</div>
		</section>
	);
}
