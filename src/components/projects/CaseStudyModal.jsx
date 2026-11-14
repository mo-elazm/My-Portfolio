"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
	FiArrowUpRight,
	FiCheck,
	FiCode,
	FiExternalLink,
	FiGithub,
	FiLayers,
	FiTarget,
	FiX,
} from "react-icons/fi";
import { caseStudies } from "@/data/projects";
import { profile } from "@/data/profile";
import { useTranslation } from "@/i18n";
import { gsap } from "@/lib/gsap";
import useAppStore from "@/store/useAppStore";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";
import CaseStudyVisual from "@/components/projects/CaseStudyVisual";

const sections = [
	{ key: "problem", labelKey: "problemLabel", icon: FiTarget },
	{ key: "architecture", labelKey: "architectureLabel", icon: FiLayers },
];

export default function CaseStudyModal() {
	const { t } = useTranslation();
	const activeId = useAppStore((state) => state.activeCaseStudy);
	const closeCaseStudy = useAppStore((state) => state.closeCaseStudy);
	const rootRef = useRef(null);
	const panelRef = useRef(null);
	const closeRef = useRef(null);
	const previousFocus = useRef(null);
	const closing = useRef(false);
	const hasEntered = useRef(false);

	const study = caseStudies.find((item) => item.id === activeId) || null;
	const copy = study ? t.projects.items[study.id] : null;

	useLockBodyScroll(Boolean(activeId));

	const requestClose = useCallback(() => {
		if (closing.current) return;

		if (!rootRef.current || !panelRef.current) {
			closeCaseStudy();
			return;
		}

		closing.current = true;
		const context = gsap.context(() => {
			gsap.to(panelRef.current, {
				autoAlpha: 0,
				y: 24,
				scale: 0.985,
				duration: 0.22,
				ease: "power2.in",
			});
			gsap.to(rootRef.current, {
				autoAlpha: 0,
				duration: 0.24,
				delay: 0.04,
				ease: "power2.in",
				onComplete: () => {
					closing.current = false;
					closeCaseStudy();
				},
			});
		}, rootRef);

		return () => context.revert();
	}, [closeCaseStudy]);

	useEffect(() => {
		if (!activeId) return undefined;

		if (!hasEntered.current) {
			previousFocus.current = document.activeElement;
			hasEntered.current = true;
		}

		const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);

		const onKeyDown = (event) => {
			if (event.key === "Escape") {
				event.preventDefault();
				requestClose();
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
	}, [activeId, requestClose]);

	useEffect(() => {
		if (!activeId || !rootRef.current || !panelRef.current) return undefined;

		closing.current = false;

		const context = gsap.context(() => {
			gsap.fromTo(
				rootRef.current,
				{ autoAlpha: 0 },
				{ autoAlpha: 1, duration: 0.28, ease: "power2.out" },
			);
			gsap.fromTo(
				panelRef.current,
				{ autoAlpha: 0, y: 34, scale: 0.975 },
				{ autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" },
			);
			gsap.fromTo(
				".case-modal-copy > *",
				{ autoAlpha: 0, y: 10 },
				{ autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.05, delay: 0.12, ease: "power2.out" },
			);
		}, rootRef.current);

		return () => context.revert();
	}, [activeId]);

	useEffect(() => {
		if (activeId || !hasEntered.current) return;

		hasEntered.current = false;
		previousFocus.current?.focus?.();
		previousFocus.current = null;
	}, [activeId]);

	if (!activeId || !study || !copy) {
		return null;
	}

	return createPortal(
		<div
			ref={rootRef}
			role="dialog"
			aria-modal="true"
			aria-labelledby="case-study-title"
			className="fixed inset-0 z-[95] flex items-end justify-center sm:items-center sm:p-6"
		>
			<button
				type="button"
				aria-label={t.common.closeDialog}
				onClick={requestClose}
				className="fixed inset-0 cursor-default bg-[#09090B]/80 backdrop-blur-xl"
			/>

			<div
				ref={panelRef}
				className="relative flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-t-[1.6rem] border border-line bg-surface shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] sm:max-h-[90dvh] sm:max-w-3xl sm:rounded-[1.6rem]"
			>
				<div className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-line bg-surface/95 px-4 py-3 backdrop-blur-xl sm:px-6 sm:py-4">
					<div className="flex min-w-0 items-center gap-3">
						<span className="grid size-9 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 font-mono text-[10px] font-bold text-accent-text">
							{study.number}
						</span>
						<div className="min-w-0">
							<p className="eyebrow-label truncate">{copy.category}</p>
							<p
								id="case-study-title"
								className="mt-1 truncate font-display text-sm font-bold text-ink"
							>
								{copy.title}
							</p>
						</div>
					</div>

					<button
						ref={closeRef}
						type="button"
						onClick={requestClose}
						aria-label={t.projects.closeCaseStudy}
						title={t.projects.closeCaseStudy}
						className="icon-btn size-11 shrink-0 active:scale-[0.94] sm:size-10"
					>
						<FiX aria-hidden="true" className="size-4" />
					</button>
				</div>

				<div className="case-study-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">
					<div className="hidden border-b border-line bg-surface-2/40 p-4 sm:block sm:p-5">
						<div className="relative aspect-[16/7] w-full">
							<CaseStudyVisual kind={study.kind} />
						</div>
					</div>

					<div className="case-modal-copy p-5 sm:p-7">
						<p className="text-pretty break-words text-[0.95rem] leading-7 text-muted sm:text-base sm:leading-8">
							{copy.summary}
						</p>

						<dl className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
							<div className="min-w-0 rounded-xl border border-line bg-surface-2 p-3">
								<dt className="text-[8px] font-medium uppercase tracking-[0.12em] text-muted">
									{t.projects.roleLabel}
								</dt>
								<dd className="mt-1.5 break-words text-[11px] font-semibold leading-4 text-ink">
									{copy.role}
								</dd>
							</div>
							<div className="min-w-0 rounded-xl border border-line bg-surface-2 p-3">
								<dt className="text-[8px] font-medium uppercase tracking-[0.12em] text-muted">
									{t.projects.platformLabel}
								</dt>
								<dd className="mt-1.5 break-words text-start text-[11px] font-semibold leading-4 text-ink">
									{copy.platform}
								</dd>
							</div>
							<div className="col-span-2 min-w-0 rounded-xl border border-line bg-surface-2 p-3 sm:col-span-1">
								<dt className="text-[8px] font-medium uppercase tracking-[0.12em] text-muted">
									{t.projects.yearLabel}
								</dt>
								<dd className="mt-1.5 font-mono text-[11px] font-semibold leading-4 text-ink">
									{study.year}
								</dd>
							</div>
						</dl>

						{sections.map((section) => {
							const Icon = section.icon;

							return (
								<section key={section.key} className="mt-7">
									<div className="flex items-center gap-2">
										<span className="grid size-7 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent-text">
											<Icon aria-hidden="true" className="size-3.5" />
										</span>
										<h3 className="eyebrow-label text-ink">
											{t.projects[section.labelKey]}
										</h3>
									</div>
									<p className="mt-3 text-pretty break-words text-[13px] leading-6 text-muted sm:text-sm sm:leading-7">
										{copy[section.key]}
									</p>
								</section>
							);
						})}

						<section className="mt-7">
							<div className="flex items-center gap-2">
								<span className="grid size-7 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent-text">
									<FiCode aria-hidden="true" className="size-3.5" />
								</span>
								<h3 className="eyebrow-label text-ink">{t.projects.highlightsLabel}</h3>
							</div>
							<ul className="mt-3 space-y-2.5">
								{copy.highlights.map((highlight) => (
									<li
										key={highlight}
										className="flex items-start gap-2.5 text-[12px] leading-6 text-muted sm:text-[13px]"
									>
										<span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-text">
											<FiCheck aria-hidden="true" className="size-2.5" />
										</span>
										<span className="min-w-0 break-words">{highlight}</span>
									</li>
								))}
							</ul>
						</section>

						<div className="mt-7 border-t border-line pt-5">
							<p className="eyebrow-label">{t.projects.stackLabel}</p>
							<div className="mt-2.5 flex flex-wrap gap-1.5">
								{study.stack.map((tech) => (
									<span
										key={tech}
										className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[9px] font-medium text-muted"
									>
										{tech}
									</span>
								))}
							</div>
						</div>

						<div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
							<a
								href={study.links.repo}
								target="_blank"
								rel="noreferrer noopener"
								className="btn btn-primary w-full active:scale-[0.97] sm:w-auto"
							>
								<FiGithub aria-hidden="true" className="size-3.5" />
								<span>{t.projects.github}</span>
								<FiArrowUpRight
									aria-hidden="true"
									className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
								/>
							</a>
							<a
								href={`mailto:${profile.email}?subject=${encodeURIComponent(copy.title)}`}
								className="btn btn-secondary w-full active:scale-[0.97] sm:w-auto"
							>
								<FiExternalLink aria-hidden="true" className="size-3.5" />
								<span>{t.common.letsTalk}</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>,
		document.body,
	);
}
