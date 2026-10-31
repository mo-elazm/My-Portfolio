import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useTranslation } from "@/i18n";
import { getWhatsAppLink, profile } from "@/data/profile";
import StatusPill from "@/components/ui/StatusPill";

export default function Contact() {
	const { t } = useTranslation();
	const [form, setForm] = useState({ name: "", email: "", message: "" });

	const directContacts = [
		{
			id: "email",
			label: t.contact.direct.email,
			value: profile.email,
			href: `mailto:${profile.email}`,
			icon: FiMail,
			ltr: true,
		},
		{
			id: "whatsapp",
			label: t.contact.direct.whatsapp,
			value: profile.whatsappDisplay,
			href: getWhatsAppLink("Hi Mohamed, I found your portfolio."),
			icon: FaWhatsapp,
			ltr: true,
		},
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
	];

	const updateField = (event) => {
		const { name, value } = event.target;
		setForm((current) => ({ ...current, [name]: value }));
	};

	const onSubmit = (event) => {
		event.preventDefault();

		const lines = [
			`New project inquiry from ${form.name}`,
			`Email: ${form.email}`,
			"",
			form.message,
		];

		window.open(getWhatsAppLink(lines.join("\n")), "_blank", "noopener,noreferrer");
	};

	const inputClass =
		"w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-all duration-300 placeholder:text-muted/45 focus:border-accent-text/60 focus:ring-2 focus:ring-accent/20";

	return (
		<section id="contact" className="section-pad relative border-t border-line/70">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute end-[-8rem] top-10 size-[28rem] rounded-full bg-accent/[0.055] blur-[120px]"
			/>

			<div className="container-shell relative">
				<div
					data-reveal
					className="glass-panel relative overflow-hidden rounded-[2rem] p-5 sm:p-8 lg:p-12"
				>
					<div className="visual-grid absolute inset-0 opacity-40" aria-hidden="true" />
					<div
						aria-hidden="true"
						className="absolute -end-24 -top-32 size-80 rounded-full bg-accent/10 blur-[100px]"
					/>
					<span
						aria-hidden="true"
						className="pointer-events-none absolute end-5 top-2 hidden font-display text-[12rem] font-bold leading-none tracking-[-0.1em] text-ink/[0.025] lg:block"
					>
						06
					</span>

					<div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
						<div className="flex flex-col justify-between">
							<div>
								<div className="flex items-center gap-3">
									<span className="font-mono text-[11px] font-bold text-accent-text">
										({t.contact.number})
									</span>
									<span className="h-px w-8 bg-line-strong" aria-hidden="true" />
									<span className="eyebrow-label">{t.contact.eyebrow}</span>
								</div>

								<p className="mt-7 text-sm font-semibold text-accent-text">
									{t.contact.kicker}
								</p>
								<h2 className="mt-3 max-w-xl font-display text-[clamp(2.7rem,6vw,5rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-balance text-ink rtl:leading-[1.08] rtl:tracking-[-0.03em]">
									{t.contact.title}
								</h2>
								<p className="mt-6 max-w-lg text-pretty text-[0.95rem] leading-7 text-muted sm:text-base sm:leading-8">
									{t.contact.description}
								</p>

								<div className="mt-8">
									<p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted/80">
										{t.contact.direct.title}
									</p>
									<div className="mt-3 grid gap-2">
										{directContacts.map((contact) => {
											const Icon = contact.icon;
											return (
												<a
													key={contact.id}
													href={contact.href}
													target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
													rel={contact.href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
													className="group glass-chip flex items-center gap-3 rounded-2xl p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-text/35"
												>
													<span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface text-accent-text">
														<Icon aria-hidden="true" className="size-[17px]" />
													</span>
													<span className="min-w-0 flex-1">
														<span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-muted/65">
															{contact.label}
														</span>
														<span
															dir={contact.ltr ? "ltr" : undefined}
															className="mt-1 block truncate text-xs font-semibold text-ink"
														>
															{contact.value}
														</span>
													</span>
													<FiArrowUpRight
														aria-hidden="true"
														className="size-4 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text rtl:-scale-x-100"
													/>
												</a>
											);
										})}
									</div>
								</div>
							</div>

							<StatusPill label={t.contact.availability} className="mt-7 w-fit" />
						</div>

						<form
							onSubmit={onSubmit}
							className="glass-card relative self-center rounded-[1.7rem] p-5 sm:p-6"
						>
							<div className="flex items-center justify-between gap-4 border-b border-line pb-4">
								<h3 className="font-display text-xl font-semibold tracking-[-0.035em] text-ink">
									{t.contact.form.title}
								</h3>
								<span className="grid size-9 place-items-center rounded-full bg-accent-soft text-accent-text">
									<FaWhatsapp aria-hidden="true" className="size-4" />
								</span>
							</div>

							<div className="mt-5 space-y-4">
								<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
									<label className="block" htmlFor="contact-name">
										<span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
											{t.contact.form.name}
										</span>
										<input
											id="contact-name"
											name="name"
											type="text"
											autoComplete="name"
											required
											value={form.name}
											onChange={updateField}
											placeholder={t.contact.form.namePlaceholder}
											dir="auto"
											className={inputClass}
										/>
									</label>

									<label className="block" htmlFor="contact-email">
										<span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
											{t.contact.form.email}
										</span>
										<input
											id="contact-email"
											name="email"
											type="email"
											autoComplete="email"
											required
											value={form.email}
											onChange={updateField}
											placeholder={t.contact.form.emailPlaceholder}
											dir="ltr"
											className={inputClass}
										/>
									</label>
								</div>

								<label className="block" htmlFor="contact-message">
									<span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
										{t.contact.form.message}
									</span>
									<textarea
										id="contact-message"
										name="message"
										rows={5}
										required
										value={form.message}
										onChange={updateField}
										placeholder={t.contact.form.messagePlaceholder}
										dir="auto"
										className={`${inputClass} resize-none`}
									/>
								</label>
							</div>

							<button
								type="submit"
								className="group mt-5 flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-3 text-sm font-bold text-[#0a100b] transition-all duration-300 hover:bg-ink hover:text-canvas"
							>
								<FaWhatsapp aria-hidden="true" className="size-4" />
								<span>{t.contact.form.submit}</span>
								<FiArrowUpRight
									aria-hidden="true"
									className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
								/>
							</button>

							<p className="mt-3 text-center text-[9px] leading-4 text-muted/65">
								{t.contact.form.note}
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
