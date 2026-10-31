import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
	FiArrowUpRight,
	FiAward,
	FiCheck,
	FiChevronLeft,
	FiChevronRight,
	FiCode,
	FiExternalLink,
	FiX,
} from "react-icons/fi";
import { SiFlutter } from "react-icons/si";
import { certifications } from "@/data/certifications";
import { useTranslation } from "@/i18n";
import { gsap } from "@/lib/gsap";
import useAppStore from "@/store/useAppStore";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";
import { cn } from "@/utils/cn";

const icons = {
	flutter: SiFlutter,
	code: FiCode,
};

export default function CertificateLightbox() {
	const { t, isRTL } = useTranslation();
	const activeId = useAppStore((state) => state.activeCertificate);
	const openCertificate = useAppStore((state) => state.openCertificate);
	const closeCertificate = useAppStore((state) => state.closeCertificate);
	const rootRef = useRef(null);
	const panelRef = useRef(null);
	const closeRef = useRef(null);
	const previousFocus = useRef(null);
	const wasOpen = useRef(false);
	const hasEntered = useRef(false);

	const index = certifications.findIndex((cert) => cert.id === activeId);
	const cert = index >= 0 ? certifications[index] : null;
	const copy = cert ? t.certifications.items[cert.id] : null;
	const Icon = cert ? icons[cert.icon] : FiAward;

	useLockBodyScroll(Boolean(activeId));

	const goTo = (step) => {
		if (!cert) return;
		const next = (index + step + certifications.length) % certifications.length;
		openCertificate(certifications[next].id);
	};

	useEffect(() => {
		if (!activeId) return undefined;

		if (!wasOpen.current) {
			previousFocus.current = document.activeElement;
			wasOpen.current = true;
		}

		const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);

		const onKeyDown = (event) => {
			if (event.key === "Escape") {
				closeCertificate();
				return;
			}

			if (event.key === "ArrowRight") {
				goTo(isRTL ? -1 : 1);
				return;
			}

			if (event.key === "ArrowLeft") {
				goTo(isRTL ? 1 : -1);
				return;
			}

			if (event.key !== "Tab" || !panelRef.current) return;

			const focusable = Array.from(
				panelRef.current.querySelectorAll(
					'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
				),
			).filter((element) => element.offsetParent !== null);

			if (!focusable.length) return;

			const first = focusable[0];
			const last = focusable[focusable.length - 1];

			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};

		window.addEventListener("keydown", onKeyDown);

		return () => {
			window.clearTimeout(focusTimer);
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [activeId, isRTL]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (activeId || !wasOpen.current) return;

		wasOpen.current = false;
		hasEntered.current = false;
		previousFocus.current?.focus?.();
		previousFocus.current = null;
	}, [activeId]);

	useEffect(() => {
		if (!activeId || !rootRef.current || !panelRef.current) return undefined;

		const firstOpen = !hasEntered.current;
		hasEntered.current = true;

		const context = gsap.context(() => {
			if (firstOpen) {
				gsap.fromTo(
					rootRef.current,
					{ autoAlpha: 0 },
					{ autoAlpha: 1, duration: 0.32, ease: "power2.out" },
				);
				gsap.fromTo(
					panelRef.current,
					{ autoAlpha: 0, y: 26, scale: 0.975 },
					{ autoAlpha: 1, y: 0, scale: 1, duration: 0.62, ease: "power3.out" },
				);
			}

			gsap.fromTo(
				".cert-lightbox-media",
				{ autoAlpha: 0, x: isRTL ? 14 : -14 },
				{
					autoAlpha: 1,
					x: 0,
					duration: firstOpen ? 0.75 : 0.4,
					delay: firstOpen ? 0.08 : 0,
					ease: "power3.out",
				},
			);
			gsap.fromTo(
				".cert-lightbox-copy > *",
				{ autoAlpha: 0, y: 10 },
				{
					autoAlpha: 1,
					y: 0,
					duration: 0.45,
					stagger: 0.04,
					delay: firstOpen ? 0.16 : 0,
					ease: "power2.out",
				},
			);
		}, rootRef);

		return () => context.revert();
	}, [activeId, isRTL]);

	if (!activeId || !cert || !copy) {
		return null;
	}

	return createPortal(
		<div
			ref={rootRef}
			role="dialog"
			aria-modal="true"
			aria-label={t.certifications.lightboxLabel}
			className="fixed inset-0 z-[90] overflow-y-auto"
		>
			<button
				type="button"
				aria-label={t.common.closeDialog}
				onClick={closeCertificate}
				className="fixed inset-0 cursor-default bg-[#030604]/80 backdrop-blur-xl"
			/>

			<div className="relative flex min-h-full items-center justify-center p-3 sm:p-6">
				<div
					ref={panelRef}
					className="glass-panel relative w-full max-w-6xl overflow-hidden rounded-[1.7rem] sm:rounded-[2.1rem]"
				>
					<div className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-line/70 bg-canvas/85 px-4 py-3.5 backdrop-blur-xl sm:px-6">
						<div className="flex min-w-0 items-center gap-3">
							<span
								className={cn(
									"grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-canvas/70",
									cert.accent === "secondary" ? "text-secondary" : "text-peach",
								)}
							>
								<Icon aria-hidden="true" className="size-4.5" />
							</span>
							<div className="min-w-0">
								<p className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-muted/75">
									{t.certifications.credentialLabel}
								</p>
								<p className="mt-0.5 truncate text-xs font-bold text-ink">{copy.issuer}</p>
							</div>
						</div>

						<button
							ref={closeRef}
							type="button"
							onClick={closeCertificate}
							aria-label={t.common.closeDialog}
							className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-canvas/60 text-muted transition-colors hover:border-accent-text/40 hover:text-ink"
						>
							<FiX aria-hidden="true" className="size-4.5" />
						</button>
					</div>

					<div className="grid lg:grid-cols-[1.55fr_0.85fr]">
						<div className="relative flex items-center justify-center bg-white/[0.045] p-3 sm:p-5 lg:p-6">
							<div className="visual-grid absolute inset-0 opacity-30" aria-hidden="true" />
							<figure className="cert-lightbox-media certificate-paper relative w-full rounded-[0.9rem] p-2 sm:rounded-[1.2rem] sm:p-3">
								<img
									src={cert.image}
									alt={`${copy.subtitle} — ${copy.issuer}`}
									width={cert.width}
									height={cert.height}
									className="max-h-[62vh] w-full rounded-[0.6rem] object-contain lg:max-h-[72vh]"
								/>
							</figure>
						</div>

						<div className="flex flex-col border-t border-line/70 lg:border-s lg:border-t-0">
							<div className="cert-lightbox-copy flex-1 p-5 sm:p-7">
								<p className="eyebrow-label text-accent-text">
									{t.certifications.proofLabel}
								</p>
								<h3 className="mt-3 font-display text-[clamp(1.7rem,3.6vw,2.6rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-ink">
									{copy.title}
								</h3>
								<p className="mt-1.5 text-[11px] font-semibold text-muted">{copy.subtitle}</p>
								<p className="mt-4 text-pretty text-[0.85rem] leading-6 text-muted">
									{copy.description}
								</p>

								<dl className="mt-6 grid grid-cols-2 gap-2">
									<div className="rounded-xl border border-line bg-canvas/45 p-3">
										<dt className="text-[8px] font-bold uppercase tracking-[0.14em] text-muted/75">
											{t.certifications.issuedLabel}
										</dt>
										<dd className="mt-1.5 text-[11px] font-semibold leading-4 text-ink">
											{copy.issued}
										</dd>
									</div>
									<div className="rounded-xl border border-line bg-canvas/45 p-3">
										<dt className="text-[8px] font-bold uppercase tracking-[0.14em] text-muted/75">
											{t.certifications.durationLabel}
										</dt>
										<dd className="mt-1.5 text-[11px] font-semibold leading-4 text-ink">
											{copy.duration}
										</dd>
									</div>
									<div className="col-span-2 rounded-xl border border-line bg-canvas/45 p-3">
										<dt className="text-[8px] font-bold uppercase tracking-[0.14em] text-muted/75">
											{t.certifications.programLabel}
										</dt>
										<dd className="mt-1.5 text-[11px] font-semibold leading-4 text-ink">
											{copy.program}
										</dd>
									</div>
								</dl>

								<div className="mt-3 rounded-xl border border-line bg-canvas/45 p-3">
									<p className="text-[8px] font-bold uppercase tracking-[0.16em] text-muted/75">
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
												<p className="mt-1 max-w-[220px] text-[8.5px] font-medium leading-4 text-muted">
													{person.role}
												</p>
											</div>
										))}
									</div>
								</div>

								<div className="mt-4 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.12em] text-accent-text">
									<FiCheck aria-hidden="true" className="size-3.5" />
									<span>{t.certifications.verified}</span>
								</div>
							</div>

							<div className="flex items-center justify-between gap-3 border-t border-line/70 p-4 sm:px-6">
								<div className="flex items-center gap-1.5">
									<button
										type="button"
										onClick={() => goTo(-1)}
										aria-label={t.certifications.previousCertificate}
										title={t.certifications.previousCertificate}
										className="grid size-9 place-items-center rounded-full border border-line bg-canvas/55 text-muted transition-colors hover:border-accent-text/40 hover:text-ink"
									>
										<FiChevronLeft
											aria-hidden="true"
											className="size-4 rtl:-scale-x-100"
										/>
									</button>
									<button
										type="button"
										onClick={() => goTo(1)}
										aria-label={t.certifications.nextCertificate}
										title={t.certifications.nextCertificate}
										className="grid size-9 place-items-center rounded-full border border-line bg-canvas/55 text-muted transition-colors hover:border-accent-text/40 hover:text-ink"
									>
										<FiChevronRight
											aria-hidden="true"
											className="size-4 rtl:-scale-x-100"
										/>
									</button>
								</div>

								<a
									href={cert.image}
									target="_blank"
									rel="noreferrer noopener"
									className="group inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#0a100b] transition-colors hover:bg-ink hover:text-canvas"
								>
									<FiExternalLink aria-hidden="true" className="size-3.5" />
									<span>{t.certifications.openOriginal}</span>
									<FiArrowUpRight
										aria-hidden="true"
										className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
									/>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>,
		document.body,
	);
}
