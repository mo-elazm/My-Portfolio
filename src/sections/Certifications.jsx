import { FiAward, FiCheck, FiCode, FiMaximize2 } from "react-icons/fi";
import { SiFlutter } from "react-icons/si";
import { certifications } from "@/data/certifications";
import { useTranslation } from "@/i18n";
import useAppStore from "@/store/useAppStore";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";

const icons = {
	flutter: SiFlutter,
	code: FiCode,
};

export default function Certifications() {
	const { t } = useTranslation();
	const openCertificate = useAppStore((state) => state.openCertificate);

	return (
		<section id="certifications" className="section-pad relative border-t border-line">
			<div className="container-shell">
				<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
					<SectionHeading
						eyebrow={t.certifications.eyebrow}
						number={t.certifications.number}
						title={t.certifications.title}
						description={t.certifications.description}
					/>

					<div
						data-reveal
						className="flex w-fit shrink-0 items-center gap-3 rounded-2xl border border-line bg-surface p-3 shadow-[var(--card-shadow)]"
					>
						<span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-text">
							<FiAward aria-hidden="true" className="size-4" />
						</span>
						<p className="max-w-[190px] text-[10px] font-medium leading-4 text-muted">
							{t.certifications.badge}
						</p>
					</div>
				</div>

				<div data-reveal-group className="mt-12 grid items-stretch gap-4 lg:grid-cols-2">
					{certifications.map((cert) => {
						const copy = t.certifications.items[cert.id];
						const Icon = icons[cert.icon];

						return (
							<SpotlightCard
								key={cert.id}
								data-reveal-item
								className="flex flex-col overflow-hidden rounded-[1.7rem]"
							>
								<div className="flex items-start justify-between gap-4 p-5 pb-0 sm:p-6 sm:pb-0">
									<div className="flex min-w-0 items-center gap-3">
										<span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-accent-text">
											<Icon aria-hidden="true" className="size-[18px]" />
										</span>
										<div className="min-w-0">
											<p className="eyebrow-label">
												{t.certifications.credentialLabel}
											</p>
											<p className="mt-1.5 truncate text-[12px] font-semibold text-ink">
												{copy.issuer}
											</p>
										</div>
									</div>

									<span className="grid size-11 shrink-0 place-items-center rounded-full border border-dashed border-accent/35 bg-accent-soft">
										{cert.grade ? (
											<span className="grid size-8 place-items-center rounded-full border border-line bg-surface font-display text-[12px] font-bold text-accent-text">
												{cert.grade}
											</span>
										) : (
											<span className="grid size-8 place-items-center rounded-full border border-line bg-surface text-accent-text">
												<FiCheck aria-hidden="true" className="size-3.5" />
											</span>
										)}
									</span>
								</div>

								<div className="mx-4 mt-4 sm:mx-5">
									<button
										type="button"
										onClick={() => openCertificate(cert.id)}
										aria-haspopup="dialog"
										aria-label={`${t.certifications.viewCertificate} — ${copy.title}`}
										className="certificate-paper group/preview relative block w-full cursor-zoom-in overflow-hidden rounded-[1.1rem] p-1.5 text-start transition-[translate,box-shadow] duration-500 hover:-translate-y-0.5 focus-visible:outline-none"
									>
										<div
											className="relative overflow-hidden rounded-[0.8rem] bg-white"
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

										<span className="pointer-events-none absolute inset-1.5 grid place-items-center rounded-[0.8rem] bg-[#09090B]/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/preview:opacity-100 group-focus-visible/preview:opacity-100">
											<span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-bold text-[#09090B] shadow-lg">
												<FiMaximize2 aria-hidden="true" className="size-3.5" />
												{t.certifications.viewCertificate}
											</span>
										</span>
									</button>
								</div>

								<div className="flex flex-1 flex-col p-5 pt-5 sm:p-6 sm:pt-5">
									<p className="eyebrow-label">{copy.subtitle}</p>
									<h3 className="mt-2.5 font-display text-[clamp(1.35rem,2.6vw,1.85rem)] font-bold leading-tight tracking-[-0.035em] text-ink rtl:tracking-normal">
										{copy.title}
									</h3>
									<p className="mt-2.5 max-w-xl text-pretty text-[13px] leading-6 text-muted">
										{copy.description}
									</p>

									<dl className="mt-5 grid grid-cols-3 gap-1.5">
										{[
											{ label: t.certifications.issuedLabel, value: copy.issued },
											{ label: t.certifications.durationLabel, value: copy.duration },
											{ label: t.certifications.programLabel, value: copy.program },
										].map((detail) => (
											<div
												key={detail.label}
												className="rounded-xl border border-line bg-surface-2 p-2.5"
											>
												<dt className="text-[8px] font-medium uppercase tracking-[0.1em] text-muted">
													{detail.label}
												</dt>
												<dd className="mt-1 text-[10px] font-semibold leading-4 text-ink">
													{detail.value}
												</dd>
											</div>
										))}
									</dl>

									<div className="mt-3 rounded-xl border border-line bg-surface-2 p-3.5">
										<p className="text-[8px] font-medium uppercase tracking-[0.12em] text-muted">
											{t.certifications.signedBy}
										</p>
										<div className="mt-2.5 flex flex-wrap gap-x-6 gap-y-2.5">
											{copy.signatories.map((person) => (
												<div key={person.name}>
													<p className="font-display text-[13px] font-semibold leading-none text-ink">
														{person.name}
													</p>
													<p className="mt-1.5 max-w-[220px] text-[9px] leading-4 text-muted">
														{person.role}
													</p>
												</div>
											))}
										</div>
									</div>

									<div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
										<span className="inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-accent-text">
											<FiCheck aria-hidden="true" className="size-3.5" />
											{t.certifications.verified}
										</span>

										<button
											type="button"
											onClick={() => openCertificate(cert.id)}
											aria-haspopup="dialog"
											className="group/button inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-3.5 py-2 text-[10px] font-semibold text-ink transition-colors duration-300 hover:border-line-strong"
										>
											<FiMaximize2
												aria-hidden="true"
												className="size-3 text-accent-text"
											/>
											{t.certifications.viewCertificate}
										</button>
									</div>
								</div>
							</SpotlightCard>
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
