"use client";

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
						const signer = copy.signatories[0];
						const details = [
							{ label: t.certifications.issuedLabel, value: copy.issued },
							{ label: t.certifications.durationLabel, value: copy.duration },
							{
								label: t.certifications.gradeLabel,
								value: cert.grade || t.certifications.certified,
							},
							{
								label: t.certifications.signerLabel,
								value: signer?.name || copy.issuer,
								title: signer?.role,
							},
						];

						return (
							<SpotlightCard
								key={cert.id}
								data-reveal-item
								className="flex flex-col rounded-[1.7rem] p-5 sm:p-6"
							>
								<div className="flex items-start justify-between gap-4">
									<span className="inline-flex min-w-0 items-center gap-2.5 rounded-full border border-line bg-surface-2 px-3 py-1.5">
										<span className="grid size-7 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent-text">
											<Icon aria-hidden="true" className="size-3.5" />
										</span>
										<span className="truncate text-[11px] font-semibold text-ink">
											{copy.issuer}
										</span>
									</span>

									<span className="grid size-10 shrink-0 place-items-center rounded-full border border-dashed border-accent/35 bg-accent-soft">
										{cert.grade ? (
											<span className="grid size-7 place-items-center rounded-full border border-line bg-surface font-display text-[11px] font-bold text-accent-text">
												{cert.grade}
											</span>
										) : (
											<span className="grid size-7 place-items-center rounded-full border border-line bg-surface text-accent-text">
												<FiCheck aria-hidden="true" className="size-3.5" />
											</span>
										)}
									</span>
								</div>

								<p className="eyebrow-label mt-5">{copy.subtitle}</p>
								<h3 className="mt-2.5 font-display text-[clamp(1.35rem,2.6vw,1.85rem)] font-bold leading-tight tracking-[-0.035em] text-ink rtl:tracking-normal">
									{copy.title}
								</h3>
								<p className="mt-2.5 max-w-xl text-pretty text-[13px] leading-6 text-muted">
									{copy.description}
								</p>

								<dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
									{details.map((detail) => (
										<div key={detail.label} className="min-w-0 bg-surface-2 p-3">
											<dt className="text-[8px] font-medium uppercase tracking-[0.1em] text-muted">
												{detail.label}
											</dt>
											<dd
												title={detail.title}
												className="mt-1 truncate text-[10px] font-semibold leading-4 text-ink"
											>
												{detail.value}
											</dd>
										</div>
									))}
								</dl>

								<div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
									<span className="inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-accent-text">
										<FiCheck aria-hidden="true" className="size-3.5" />
										{t.certifications.verified}
									</span>

									<button
										type="button"
										onClick={() => openCertificate(cert.id)}
										aria-haspopup="dialog"
										className="btn btn-primary min-h-9 px-4 text-[10px]"
									>
										<FiMaximize2 aria-hidden="true" className="size-3.5" />
										<span>{t.certifications.viewCertificate}</span>
									</button>
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
