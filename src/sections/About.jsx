"use client";

import Image from "next/image";
import { FiClock, FiCode, FiGlobe, FiMapPin } from "react-icons/fi";
import { useTranslation } from "@/i18n";
import { profile } from "@/data/profile";
import CountUp from "@/components/ui/CountUp";
import ScrollWords from "@/components/ui/ScrollWords";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import StatusPill from "@/components/ui/StatusPill";
import SystemDiagram from "@/components/ui/SystemDiagram";

export default function About() {
	const { t } = useTranslation();

	const details = [
		{ icon: FiMapPin, label: t.about.locationLabel, value: t.about.locationValue },
		{ icon: FiClock, label: t.about.availabilityLabel, value: t.common.available },
		{ icon: FiCode, label: t.about.focusLabel, value: t.about.focusValue },
		{ icon: FiGlobe, label: t.about.languagesLabel, value: t.about.languagesValue },
	];

	return (
		<section id="about" className="section-pad relative border-t border-line">
			<div className="container-shell">
				<SectionHeading
					eyebrow={t.about.eyebrow}
					number={t.about.number}
					title={t.about.title}
					description={<ScrollWords text={t.about.description} />}
				/>

				<div data-reveal-group className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
					<SpotlightCard
						data-reveal-item
						specular
						className="flex flex-col justify-between rounded-[1.6rem] p-6 sm:col-span-2 sm:p-8 lg:row-span-2"
					>
						<div className="min-w-0">
							<p className="eyebrow-label">{t.about.eyebrow}</p>
							<h3 className="mt-4 max-w-lg break-words font-display text-[clamp(1.5rem,3vw,2.15rem)] font-bold leading-[1.15] tracking-[-0.035em] text-ink rtl:leading-[1.3] rtl:tracking-normal">
								{t.about.cardTitle}
							</h3>

							<div className="mt-4 max-w-xl space-y-3.5">
								{t.about.body.map((paragraph) => (
									<p
										key={paragraph}
										className="text-pretty break-words text-sm leading-7 text-muted"
									>
										{paragraph}
									</p>
								))}
							</div>
						</div>

						<div className="mt-8 grid grid-cols-3 gap-3 border-t border-line pt-5">
							{t.about.stats.map((stat) => (
								<div key={stat.label} className="min-w-0">
									<CountUp
										value={stat.value}
										className="block break-words font-display text-lg font-bold tracking-[-0.03em] text-ink sm:text-2xl"
									/>
									<p className="mt-1 break-words text-[10px] font-medium leading-4 text-muted">
										{stat.label}
									</p>
								</div>
							))}
						</div>
					</SpotlightCard>

					<SpotlightCard
						data-reveal-item
						specular
						className="flex flex-col rounded-[1.6rem] p-5 sm:col-span-2 sm:p-6 lg:col-span-1 lg:row-span-2"
					>
						<div className="flex items-center gap-3">
							<span className="relative size-14 shrink-0 overflow-hidden rounded-2xl border border-line bg-surface-2">
								<Image
									src={profile.portrait}
									alt={t.about.portraitAlt}
									fill
									sizes="56px"
									className="object-cover object-top contrast-[1.05] saturate-[0.82]"
								/>
							</span>
							<div className="min-w-0">
								<p className="truncate font-display text-sm font-bold text-ink">
									{t.common.name}
								</p>
								<p className="mt-1 truncate text-[11px] font-medium text-muted">
									{t.common.role}
								</p>
							</div>
						</div>

						<div className="mt-6 space-y-3.5">
							{details.map((detail) => {
								const Icon = detail.icon;

								return (
									<div
										key={detail.label}
										className="flex items-start gap-3 border-b border-line pb-3.5 last:border-0 last:pb-0"
									>
										<span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg border border-line bg-surface-2 text-accent-text">
											<Icon aria-hidden="true" className="size-3.5" />
										</span>
										<div className="min-w-0">
											<p className="text-[9px] font-medium uppercase tracking-[0.12em] text-muted">
												{detail.label}
											</p>
											<p className="mt-1 break-words text-[11px] font-semibold leading-4 text-ink">
												{detail.value}
											</p>
										</div>
									</div>
								);
							})}
						</div>

						<div className="mt-auto border-t border-line pt-5">
							<StatusPill label={t.hero.badge} className="max-w-full text-start" />
						</div>
					</SpotlightCard>

					{Object.entries(t.about.cards).map(([key, card]) => (
						<SpotlightCard
							key={key}
							data-reveal-item
							specular
							className="rounded-[1.6rem] p-5 sm:p-6"
						>
							<p className="eyebrow-label">{card.label}</p>
							<h3 className="mt-3 break-words font-display text-lg font-bold leading-6 tracking-[-0.02em] text-ink rtl:tracking-normal">
								{card.title}
							</h3>
							<p className="mt-2 text-pretty break-words text-[12px] leading-6 text-muted">
								{card.text}
							</p>
							{key === "focus" ? <SystemDiagram /> : null}
						</SpotlightCard>
					))}

					<SpotlightCard
						data-reveal-item
						specular
						className="rounded-[1.6rem] p-6 sm:col-span-2 sm:p-8 lg:col-span-3"
					>
						<div className="flex items-start gap-4">
							<span
								aria-hidden="true"
								className="hidden font-display text-5xl leading-none text-accent-text/30 sm:block"
							>
								“
							</span>
							<p className="max-w-3xl text-pretty break-words font-display text-base font-medium leading-7 text-ink sm:text-lg sm:leading-8">
								<ScrollWords text={t.about.quote} />
							</p>
						</div>
					</SpotlightCard>
				</div>
			</div>
		</section>
	);
}
