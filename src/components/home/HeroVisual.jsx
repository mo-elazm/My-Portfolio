"use client";

import { FiCheck, FiMonitor, FiServer, FiSmartphone } from "react-icons/fi";
import { useTranslation } from "@/i18n";

const layers = [
	{ key: "web", metaKey: "webMeta", icon: FiMonitor, index: "01" },
	{ key: "api", metaKey: "apiMeta", icon: FiServer, index: "02" },
	{ key: "mobile", metaKey: "mobileMeta", icon: FiSmartphone, index: "03" },
];

const profileTag = "SWE / 26";

export default function HeroVisual() {
	const { t } = useTranslation();

	return (
		<div className="hero-visual relative mx-auto w-full max-w-[440px]">
			<div
				aria-hidden="true"
				className="absolute -inset-6 rounded-[3rem] bg-indigo-600/[0.06] blur-2xl dark:bg-indigo-500/20"
			/>

			<div className="relative rounded-[1.8rem] border border-line bg-surface p-2.5 shadow-[var(--card-shadow)]">
				<div className="relative overflow-hidden rounded-[1.35rem] border border-line bg-surface-2/50 p-4 sm:p-5">
					<div
						aria-hidden="true"
						className="dot-grid pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_80%_60%_at_100%_0%,black,transparent)]"
					/>

					<div className="relative flex items-start justify-between gap-3">
						<div className="min-w-0">
							<p className="eyebrow-label">{t.hero.visual.label}</p>
							<h2 className="mt-2.5 font-display text-[clamp(1.05rem,2.4vw,1.35rem)] font-bold leading-snug tracking-[-0.02em] text-ink rtl:tracking-normal">
								{t.hero.visual.title}
							</h2>
						</div>
						<span className="mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-[9px] font-semibold text-accent-text">
							<span className="relative flex size-1.5" aria-hidden="true">
								<span className="absolute inline-flex size-full animate-pulse-soft rounded-full bg-accent" />
								<span className="relative inline-flex size-1.5 rounded-full bg-accent" />
							</span>
							EG
						</span>
					</div>

					<div className="relative mt-5">
						<span
							aria-hidden="true"
							className="absolute bottom-4 start-[19px] top-4 w-px bg-line-strong"
						/>

						<ul className="space-y-2">
							{layers.map((layer) => {
								const Icon = layer.icon;

								return (
									<li
										key={layer.key}
										className="group/layer relative flex items-center gap-3 rounded-xl border border-line bg-surface p-2.5 transition-colors duration-300 hover:border-line-strong"
									>
										<span className="relative z-10 grid size-8 shrink-0 place-items-center rounded-lg border border-line bg-surface-2 text-accent-text">
											<Icon aria-hidden="true" className="size-3.5" />
										</span>
										<span className="min-w-0 flex-1">
											<span className="block text-[11px] font-semibold leading-4 text-ink">
												{t.hero.visual[layer.key]}
											</span>
											<span
												className="mt-0.5 block truncate text-start font-mono text-[9px] leading-4 text-muted"
											>
												{t.hero.visual[layer.metaKey]}
											</span>
										</span>
										<span className="shrink-0 font-mono text-[8px] font-medium text-muted/60">
											{layer.index}
										</span>
									</li>
								);
							})}
						</ul>
					</div>

					<div className="relative mt-4 flex items-center justify-between gap-3 border-t border-line pt-3.5">
						<span className="inline-flex min-w-0 items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-accent-text">
							<FiCheck aria-hidden="true" className="size-3 shrink-0" />
							<span className="truncate">{t.hero.visual.status}</span>
						</span>
						<span className="shrink-0 font-mono text-[9px] font-medium text-muted">
							{t.hero.visual.metric}
						</span>
					</div>
				</div>

				<div className="flex items-center justify-between gap-3 px-2 pb-1 pt-3">
					<span className="inline-flex min-w-0 items-center gap-1.5 text-[10px] font-medium text-muted">
						<span className="size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
						<span className="truncate">{t.hero.visual.flowLabel}</span>
					</span>
					<span className="shrink-0 font-mono text-[8px] font-medium uppercase tracking-[0.16em] text-muted/70">
						{profileTag}
					</span>
				</div>
			</div>
		</div>
	);
}
