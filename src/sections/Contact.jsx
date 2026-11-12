import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import {
	FiArrowUpRight,
	FiCheck,
	FiCopy,
	FiGithub,
	FiLinkedin,
	FiMail,
	FiMapPin,
} from "react-icons/fi";
import { useTranslation } from "@/i18n";
import { getWhatsAppLink, profile } from "@/data/profile";
import Button from "@/components/ui/Button";
import StatusPill from "@/components/ui/StatusPill";

export default function Contact() {
	const { t } = useTranslation();
	const [copied, setCopied] = useState(false);
	const timerRef = useRef(null);

	useEffect(() => () => window.clearTimeout(timerRef.current), []);

	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText(profile.email);
		} catch {
			const field = document.createElement("textarea");
			field.value = profile.email;
			field.setAttribute("readonly", "");
			field.style.position = "fixed";
			field.style.opacity = "0";
			document.body.appendChild(field);
			field.select();
			document.execCommand("copy");
			document.body.removeChild(field);
		}

		setCopied(true);
		window.clearTimeout(timerRef.current);
		timerRef.current = window.setTimeout(() => setCopied(false), 2200);
	};

	const socials = [
		{
			id: "github",
			label: t.contact.direct.github,
			value: t.contact.direct.githubValue,
			href: profile.github,
			icon: FiGithub,
		},
		{
			id: "linkedin",
			label: t.contact.direct.linkedin,
			value: t.contact.direct.linkedinValue,
			href: profile.linkedin,
			icon: FiLinkedin,
		},
		{
			id: "whatsapp",
			label: t.contact.direct.whatsapp,
			value: t.contact.direct.whatsappValue,
			href: getWhatsAppLink("Hi Mohamed, I found your portfolio."),
			icon: FaWhatsapp,
			ltr: true,
		},
	];

	return (
		<section id="contact" className="section-pad relative border-t border-line">
			<div className="container-shell">
				<div
					data-reveal
					className="relative overflow-hidden rounded-[1.8rem] border border-line bg-surface p-6 shadow-[var(--card-shadow)] sm:rounded-[2rem] sm:p-9 lg:p-12"
				>
					<div
						aria-hidden="true"
						className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_80%_at_100%_0%,black,transparent)]"
					/>
					<div
						aria-hidden="true"
						className="pointer-events-none absolute -end-24 -top-28 size-72 rounded-full bg-accent/[0.09] blur-[110px]"
					/>

					<div className="relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-14">
						<div>
							<div className="flex items-center gap-3">
								<span className="font-mono text-[11px] font-medium text-accent-text">
									{t.contact.number}
								</span>
								<span className="h-px w-8 bg-line-strong" aria-hidden="true" />
								<span className="eyebrow-label">{t.contact.eyebrow}</span>
							</div>

							<h2 className="mt-6 max-w-xl font-display text-[clamp(2.15rem,4.8vw,3.75rem)] font-bold leading-[1.04] tracking-[-0.045em] text-balance text-ink rtl:leading-[1.2] rtl:tracking-[-0.015em]">
								{t.contact.title}
							</h2>

							<p className="mt-5 max-w-lg text-pretty text-[0.95rem] leading-7 text-muted sm:text-base sm:leading-8">
								{t.contact.description}
							</p>

							<div className="mt-7 flex flex-wrap items-center gap-3">
								<StatusPill label={t.contact.availability} />
								<span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted">
									<FiMapPin aria-hidden="true" className="size-3.5 text-accent-text" />
									{t.contact.location}
								</span>
							</div>
						</div>

						<div className="flex flex-col gap-3">
							<div className="rounded-[1.4rem] border border-line bg-canvas p-4 sm:p-5">
								<p className="eyebrow-label">{t.contact.emailLabel}</p>

								<div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
									<a
										href={`mailto:${profile.email}`}
										className="group inline-flex min-w-0 items-center gap-2.5 text-sm font-semibold text-ink transition-colors hover:text-accent-text"
									>
										<FiMail
											aria-hidden="true"
											className="size-4 shrink-0 text-accent-text"
										/>
										<span dir="ltr" className="truncate font-mono text-[12px] sm:text-[13px]">
											{profile.email}
										</span>
									</a>

									<button
										type="button"
										onClick={copyEmail}
										aria-live="polite"
										className="btn btn-primary min-h-9 w-full shrink-0 px-4 text-[11px] sm:w-auto"
									>
										{copied ? (
											<FiCheck aria-hidden="true" className="size-3.5" />
										) : (
											<FiCopy aria-hidden="true" className="size-3.5" />
										)}
										<span>{copied ? t.contact.copied : t.contact.copyEmail}</span>
									</button>
								</div>

								<p className="mt-3 text-[10px] leading-4 text-muted/80">
									{copied ? t.contact.copiedHint : t.contact.availability}
								</p>
							</div>

							<div className="grid gap-2 sm:grid-cols-3">
								{socials.map((social) => {
									const Icon = social.icon;

									return (
										<a
											key={social.id}
											href={social.href}
											target="_blank"
											rel="noreferrer noopener"
											className="group flex items-center gap-3 rounded-[1.15rem] border border-line bg-canvas p-3 transition-colors duration-300 hover:border-line-strong sm:flex-col sm:items-start sm:gap-2.5"
										>
											<span className="grid size-8 shrink-0 place-items-center rounded-lg border border-line bg-surface text-accent-text">
												<Icon aria-hidden="true" className="size-3.5" />
											</span>
											<span className="min-w-0 flex-1">
												<span className="block text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
													{social.label}
												</span>
												<span
													dir={social.ltr ? "ltr" : undefined}
													className="mt-0.5 block truncate text-[11px] font-semibold text-ink"
												>
													{social.value}
												</span>
											</span>
											<FiArrowUpRight
												aria-hidden="true"
												className="size-3.5 shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
											/>
										</a>
									);
								})}
							</div>

							<div className="mt-1 flex flex-col gap-2 sm:flex-row">
								<Button href={`mailto:${profile.email}`} className="w-full sm:w-auto">
									{t.common.letsTalk}
								</Button>
								<Button
									href={getWhatsAppLink("Hi Mohamed, I found your portfolio.")}
									variant="secondary"
									icon={false}
									target="_blank"
									rel="noreferrer noopener"
									className="w-full sm:w-auto"
								>
									<FaWhatsapp aria-hidden="true" className="size-3.5" />
									{t.contact.whatsappCta}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
