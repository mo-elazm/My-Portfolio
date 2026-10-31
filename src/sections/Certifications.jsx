import { FiAward, FiCheck, FiCode, FiMaximize2 } from "react-icons/fi";
import { SiFlutter } from "react-icons/si";
import { certifications } from "@/data/certifications";
import { useTranslation } from "@/i18n";
import { cn } from "@/utils/cn";
import useAppStore from "@/store/useAppStore";
import SectionHeading from "@/components/ui/SectionHeading";

const icons = {
	flutter: SiFlutter,
	code: FiCode,
};

export default function Certifications() {
	const { t, isRTL } = useTranslation();
	const openCertificate = useAppStore((state) => state.openCertificate);

	return (
		<section
			id="certifications"
			className="section-pad relative border-t border-line/70 bg-surface/20"
		>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute start-[-6rem] top-[22%] size-[24rem] rounded-full bg-accent/[0.05] blur-[120px]"
			/>

			<div className="container-shell relative">
				<div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
					<SectionHeading
						eyebrow={t.certifications.eyebrow}
						number={t.certifications.number}
						title={t.certifications.title}
						description={t.certifications.description}
					/>

					<div data-reveal className="flex shrink-0 items-center gap-3 lg:pb-2">
						<span className="glass-chip grid size-10 place-items-center rounded-full text-accent-text">
							<FiAward aria-hidden="true" className="size-4" />
						</span>
						<p className="max-w-[190px] text-[10px] font-semibold leading-4 text-muted">
							{t.certifications.badge}
						</p>
					</div>
				</div>

				<div className="mt-12 grid items-stretch gap-5 lg:grid-cols-2">
					{certifications.map((cert, index) => {
						const copy = t.certifications.items[cert.id];
						const Icon = icons[cert.icon];
						const isIbm = cert.id === "ibm";

						return (
							<article
								key={cert.id}
								data-reveal
								data-reveal-delay={index * 0.08}
								className="group glass-card card-sheen relative flex flex-col overflow-hidden rounded-[2rem]"
							>
								<div
									aria-hidden="true"
									className={cn(
										"pointer-events-none absolute -end-16 -top-20 size-56 rounded-full blur-3xl",
										isIbm ? "bg-secondary/[0.12]" : "bg-peach/[0.12]",
									)}
								/>

								<div className="relative flex items-start justify-between gap-4 p-5 pb-0 sm:px-6 sm:pt-6">
									<div className="flex min-w-0 items-center gap-3">
										<span
											className={cn(
												"grid size-11 shrink-0 place-items-center rounded-2xl border border-line bg-canvas/70",
												isIbm ? "text-secondary" : "text-peach",
											)}
										>
											<Icon aria-hidden="true" className="size-5" />
										</span>
										<div className="min-w-0">
											<p className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-muted">
												{t.certifications.credentialLabel}
											</p>
											<p className="mt-1 truncate text-[11px] font-bold text-ink">
												{copy.issuer}
											</p>
										</div>
									</div>

									<span className="relative grid size-14 shrink-0 place-items-center rounded-full border border-dashed border-accent-text/35 bg-accent-soft">
										{cert.grade ? (
											<span className="grid size-10 place-items-center rounded-full border border-accent-text/20 bg-canvas/80 font-display text-sm font-bold text-accent-text">
												{cert.grade}
											</span>
										) : (
											<span className="grid size-10 place-items-center rounded-full border border-accent-text/20 bg-canvas/80 text-accent-text">
												<FiCheck aria-hidden="true" className="size-4.5" />
											</span>
										)}
									</span>
								</div>

								<div className="relative mx-4 mt-4 sm:mx-5">
									<button
										type="button"
										onClick={() => openCertificate(cert.id)}
										aria-haspopup="dialog"
										aria-label={`${t.certifications.viewCertificate} — ${copy.title}`}
										className="certificate-paper group/preview relative block w-full cursor-zoom-in overflow-hidden rounded-[1.25rem] p-1.5 text-start transition-transform duration-500 hover:-translate-y-0.5 focus-visible:outline-none"
									>
										<div
											className="relative overflow-hidden rounded-[0.9rem] bg-white"
											style={{ aspectRatio: `${cert.width} / ${cert.height}` }}
										>
											<img
												src={cert.image}
												alt={`${copy.subtitle} — ${copy.issuer}`}
												width={cert.width}
												height={cert.height}
												loading="lazy"
												decoding="async"
												className="size-full object-contain transition-transform duration-700 group-hover/preview:scale-[1.015]"
											/>
										</div>

										<span className="pointer-events-none absolute inset-1.5 grid place-items-center rounded-[0.9rem] bg-[#040806]/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/preview:opacity-100 group-focus-visible/preview:opacity-100">
											<span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#0a100b] shadow-lg">
												<FiMaximize2 aria-hidden="true" className="size-3.5" />
												{t.certifications.viewCertificate}
											</span>
										</span>
									</button>
								</div>

								<div className="relative flex flex-1 flex-col p-5 pt-5 sm:p-6">
									<p className="eyebrow-label">{copy.subtitle}</p>
									<h3 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.1rem)] font-semibold leading-tight tracking-[-0.045em] text-ink">
										{copy.title}
									</h3>
									<p className="mt-2.5 max-w-xl text-pretty text-[0.85rem] leading-6 text-muted">
										{copy.description}
									</p>

									<dl className="mt-5 grid grid-cols-3 gap-1.5">
										<div className="rounded-xl border border-line bg-canvas/50 p-2.5">
											<dt className="text-[7.5px] font-bold uppercase tracking-[0.12em] text-muted/80">
												{t.certifications.issuedLabel}
											</dt>
											<dd className="mt-1 text-[10px] font-semibold leading-4 text-ink">
												{copy.issued}
											</dd>
										</div>
										<div className="rounded-xl border border-line bg-canvas/50 p-2.5">
											<dt className="text-[7.5px] font-bold uppercase tracking-[0.12em] text-muted/80">
												{t.certifications.durationLabel}
											</dt>
											<dd className="mt-1 text-[10px] font-semibold leading-4 text-ink">
												{copy.duration}
											</dd>
										</div>
										<div className="rounded-xl border border-line bg-canvas/50 p-2.5">
											<dt className="text-[7.5px] font-bold uppercase tracking-[0.12em] text-muted/80">
												{t.certifications.programLabel}
											</dt>
											<dd className="mt-1 text-[10px] font-semibold leading-4 text-ink">
												{copy.program}
											</dd>
										</div>
									</dl>

									<div className="mt-3 rounded-2xl border border-line bg-canvas/55 p-3.5">
										<p className="text-[8px] font-bold uppercase tracking-[0.16em] text-muted/80">
											{t.certifications.signedBy}
										</p>
										<div className="mt-2.5 flex flex-wrap gap-x-6 gap-y-2.5">
											{copy.signatories.map((person) => (
												<div key={person.name}>
													<p
														className={cn(
															"font-serif text-[16px] leading-none text-ink",
															!isRTL && "italic",
														)}
													>
														{person.name}
													</p>
													<p className="mt-1.5 max-w-[220px] text-[8.5px] font-medium leading-4 text-muted">
														{person.role}
													</p>
												</div>
											))}
										</div>
									</div>

									<div className="relative mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
										<span className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.12em] text-accent-text">
											<FiCheck aria-hidden="true" className="size-3.5" />
											{t.certifications.verified}
										</span>

										<button
											type="button"
											onClick={() => openCertificate(cert.id)}
											aria-haspopup="dialog"
											className="group/button inline-flex items-center gap-2 rounded-full border border-line bg-canvas/60 px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.1em] text-ink transition-all duration-300 hover:border-accent-text/45 hover:text-accent-text"
										>
											<FiMaximize2 aria-hidden="true" className="size-3" />
											{t.certifications.viewCertificate}
										</button>
									</div>
								</div>
							</article>
						);
					})}
				</div>

				<p
					data-reveal
					className="mt-6 flex items-center justify-center gap-2 text-center text-[10px] leading-5 text-muted"
				>
					<FiAward aria-hidden="true" className="size-3.5 shrink-0 text-accent-text" />
					<span>{t.certifications.footnote}</span>
				</p>
			</div>
		</section>
	);
}
