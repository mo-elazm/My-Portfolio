import { FiArrowUpRight, FiMapPin } from "react-icons/fi";
import { useTranslation } from "@/i18n";
import { profile } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
	const { t, isRTL } = useTranslation();
	const metadata = [
		{
			label: t.about.profile.basedIn,
			value: t.about.profile.basedInValue,
		},
		{
			label: t.about.profile.focus,
			value: t.about.profile.focusValue,
		},
		{
			label: t.about.profile.approach,
			value: t.about.profile.approachValue,
		},
	];

	return (
		<section id="about" className="section-pad relative border-t border-line/70">
			<div className="container-shell">
				<div className="grid items-start gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 xl:gap-20">
					<div data-reveal className="relative mx-auto w-full max-w-[390px] lg:sticky lg:top-28">
						<div
							aria-hidden="true"
							className="absolute -inset-3 rounded-[2.6rem] bg-gradient-to-b from-accent/20 via-transparent to-secondary/15 blur-2xl"
						/>

						<figure className="glass-panel relative overflow-hidden rounded-[2.2rem] p-2.5">
							<div className="relative overflow-hidden rounded-[1.7rem] border border-white/[0.06] bg-[#060b08]">
								<div className="visual-grid-sm absolute inset-0 opacity-20" aria-hidden="true" />
								<div
									aria-hidden="true"
									className="absolute -end-16 -top-16 size-44 rounded-full bg-accent/15 blur-[70px]"
								/>
								<img
									src={profile.portrait}
									alt={t.about.profile.alt}
									width={1200}
									height={1200}
									decoding="async"
									className="relative block h-auto w-full object-contain"
								/>
							</div>

							<figcaption className="flex items-center justify-between gap-3 px-2.5 pb-1 pt-3.5">
								<div className="min-w-0">
									<p className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-muted/70">
										{t.about.profile.portrait}
									</p>
									<p className="mt-1 truncate font-display text-lg font-semibold tracking-[-0.04em] text-ink">
										{t.common.name}
									</p>
									<p className="mt-0.5 truncate text-[10px] font-medium text-muted">
										{t.common.role}
									</p>
								</div>
								<span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-canvas/60 px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.1em] text-muted">
									<span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
									{t.hero.card.status}
								</span>
							</figcaption>
						</figure>

						<div className="relative mt-3 grid grid-cols-3 gap-2">
							{metadata.map((item) => (
								<div
									key={item.label}
									className="glass-chip rounded-2xl p-3 transition-colors hover:border-accent-text/30"
								>
									<p className="text-[8px] font-bold uppercase tracking-[0.16em] text-muted/80">
										{item.label}
									</p>
									<p className="mt-1.5 text-[10px] font-semibold leading-4 text-ink">
										{item.value}
									</p>
								</div>
							))}
						</div>

						<div className="glass-card relative mt-3 rounded-2xl p-4">
							<div className="flex items-center justify-between gap-3">
								<p className="text-[8px] font-bold uppercase tracking-[0.15em] text-muted/75">
									{t.about.profile.currentlyLabel}
								</p>
								<span className="inline-flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.12em] text-accent-text">
									<FiMapPin aria-hidden="true" className="size-3" />
									{t.hero.card.location}
								</span>
							</div>
							<p className="mt-1.5 text-[11px] font-semibold leading-5 text-ink">
								{t.about.profile.currentlyValue}
							</p>
							<div className="mt-3 flex flex-wrap gap-1.5">
								{["React", "Next.js", "Laravel"].map((tech) => (
									<span
										key={tech}
										className="rounded-full border border-line bg-surface/70 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.08em] text-muted"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					</div>

					<div className="pt-1 lg:pt-2">
						<SectionHeading
							eyebrow={t.about.eyebrow}
							number={t.about.number}
							title={t.about.title}
							description={t.about.intro}
						/>

						<div className="mt-7 max-w-[680px] space-y-5">
							{t.about.body.map((paragraph) => (
								<p
									key={paragraph}
									data-reveal
									className="text-pretty text-[0.95rem] leading-7 text-muted sm:text-base sm:leading-8"
								>
									{paragraph}
								</p>
							))}
						</div>

						<div className="mt-9 grid gap-3 sm:grid-cols-3">
							{t.about.cards.map((card, index) => (
								<article
									key={card.title}
									data-reveal
									data-reveal-delay={index * 0.05}
									className="group glass-card card-sheen relative overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent-text/30"
								>
									<div
										aria-hidden="true"
										className="absolute -end-4 -top-5 font-display text-6xl font-bold text-ink/[0.035] transition-colors group-hover:text-accent-text/[0.08]"
									>
										0{index + 1}
									</div>
									<div className="relative z-[2]">
										<span className="grid size-8 place-items-center rounded-full border border-line bg-canvas/60 text-accent-text">
											<FiArrowUpRight
												aria-hidden="true"
												className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
											/>
										</span>
										<h3 className="mt-4 text-[13px] font-bold leading-5 text-ink">
											{card.title}
										</h3>
										<p className="mt-2 text-pretty text-[11px] leading-[1.65] text-muted">
											{card.text}
										</p>
									</div>
								</article>
							))}
						</div>

						<blockquote
							data-reveal
							className="glass-card relative mt-9 overflow-hidden rounded-[1.6rem] px-5 py-5 sm:px-6"
						>
							<span
								aria-hidden="true"
								className="absolute end-4 top-0 font-serif text-8xl leading-none text-accent-text/10"
							>
								”
							</span>
							<div className="relative flex items-start gap-4">
								<span className="mt-1 hidden h-12 w-1 shrink-0 rounded-full bg-gradient-to-b from-accent to-secondary sm:block" />
								<p
									className={`max-w-2xl text-pretty font-serif text-lg leading-7 tracking-[-0.02em] text-ink sm:text-xl sm:leading-8 ${
										isRTL ? "" : "italic"
									}`}
								>
									“{t.about.quote}”
								</p>
							</div>
						</blockquote>
					</div>
				</div>
			</div>
		</section>
	);
}
