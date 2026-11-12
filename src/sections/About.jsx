import { FiMapPin } from "react-icons/fi";
import { useTranslation } from "@/i18n";
import { profile } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import StatusPill from "@/components/ui/StatusPill";

export default function About() {
	const { t } = useTranslation();

	return (
		<section id="about" className="section-pad relative border-t border-line">
			<div className="container-shell">
				<SectionHeading
					eyebrow={t.about.eyebrow}
					number={t.about.number}
					title={t.about.title}
					description={t.about.description}
				/>

				<div
					data-reveal-group
					className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
				>
					<SpotlightCard
						data-reveal-item
						className="flex flex-col justify-between rounded-[1.6rem] p-6 sm:col-span-2 sm:p-8 lg:row-span-2"
					>
						<div>
							<p className="eyebrow-label">{t.about.eyebrow}</p>
							<h3 className="mt-4 max-w-lg font-display text-[clamp(1.55rem,3vw,2.2rem)] font-bold leading-[1.15] tracking-[-0.035em] text-ink rtl:leading-[1.3] rtl:tracking-normal">
								{t.about.cardTitle}
							</h3>

							<div className="mt-4 max-w-xl space-y-3.5">
								{t.about.body.map((paragraph) => (
									<p
										key={paragraph}
										className="text-pretty text-sm leading-7 text-muted"
									>
										{paragraph}
									</p>
								))}
							</div>
						</div>

						<div className="mt-8 grid grid-cols-3 gap-3 border-t border-line pt-5">
							{t.about.stats.map((stat) => (
								<div key={stat.label}>
									<p className="font-display text-xl font-bold tracking-[-0.03em] text-ink sm:text-2xl">
										{stat.value}
									</p>
									<p className="mt-1 text-[10px] font-medium leading-4 text-muted">
										{stat.label}
									</p>
								</div>
							))}
						</div>
					</SpotlightCard>

					<SpotlightCard
						data-reveal-item
						className="rounded-[1.6rem] p-2 sm:col-span-2 lg:col-span-1 lg:row-span-2"
					>
						<div className="relative overflow-hidden rounded-[1.25rem] border border-line bg-surface-2">
							<div
								aria-hidden="true"
								className="dot-grid-sm absolute inset-0 opacity-40"
							/>
							<img
								src={profile.portrait}
								alt={t.about.portraitAlt}
								width={1200}
								height={1200}
								loading="lazy"
								decoding="async"
								className="relative block aspect-square w-full object-contain"
							/>
						</div>

						<div className="flex items-end justify-between gap-3 px-2 pb-1.5 pt-3">
							<div className="min-w-0">
								<p className="font-mono text-[8px] font-medium uppercase tracking-[0.16em] text-muted/80">
									{t.hero.portraitLabel}
								</p>
								<p className="mt-1.5 truncate font-display text-sm font-bold text-ink">
									{t.common.name}
								</p>
								<p className="mt-0.5 flex items-center gap-1 text-[10px] text-muted">
									<FiMapPin aria-hidden="true" className="size-3 text-accent-text" />
									{t.about.locationValue}
								</p>
							</div>
							<StatusPill label={t.hero.badge} className="shrink-0" />
						</div>
					</SpotlightCard>

					{Object.entries(t.about.cards).map(([key, card]) => (
						<SpotlightCard
							key={key}
							data-reveal-item
							className="rounded-[1.6rem] p-5 sm:p-6"
						>
							<p className="eyebrow-label">{card.label}</p>
							<h3 className="mt-3 font-display text-lg font-bold leading-6 tracking-[-0.02em] text-ink rtl:tracking-normal">
								{card.title}
							</h3>
							<p className="mt-2 text-pretty text-[12px] leading-6 text-muted">
								{card.text}
							</p>
						</SpotlightCard>
					))}

					<SpotlightCard
						data-reveal-item
						className="rounded-[1.6rem] p-6 sm:col-span-2 sm:p-8 lg:col-span-3"
					>
						<div className="flex items-start gap-4">
							<span
								aria-hidden="true"
								className="hidden font-display text-5xl leading-none text-accent-text/30 sm:block"
							>
								“
							</span>
							<p className="max-w-3xl text-pretty font-display text-base font-medium leading-7 text-ink sm:text-lg sm:leading-8">
								{t.about.quote}
							</p>
						</div>
					</SpotlightCard>
				</div>
			</div>
		</section>
	);
}
