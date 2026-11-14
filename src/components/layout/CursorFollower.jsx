"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useTranslation } from "@/i18n";

export default function CursorFollower() {
	const { t, isRTL } = useTranslation();
	const dotRef = useRef(null);
	const pillRef = useRef(null);
	const labelRef = useRef(null);
	const label = `${t.common.explore} ${isRTL ? "↖" : "↗"}`;

	useEffect(() => {
		if (labelRef.current) {
			labelRef.current.textContent = label;
		}
	}, [label]);

	useEffect(() => {
		const dot = dotRef.current;
		const pill = pillRef.current;

		if (!dot || !pill) {
			return undefined;
		}

		if (!window.matchMedia("(pointer: fine)").matches) {
			return undefined;
		}

		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (reduceMotion) {
			return undefined;
		}

		const html = document.documentElement;
		html.dataset.cursorReady = "true";

		gsap.set([dot, pill], { xPercent: -50, yPercent: -50, autoAlpha: 0 });
		gsap.set(pill, { scale: 0.7 });

		const dotX = gsap.quickTo(dot, "x", { duration: 0.18, ease: "power3.out" });
		const dotY = gsap.quickTo(dot, "y", { duration: 0.18, ease: "power3.out" });
		const pillX = gsap.quickTo(pill, "x", { duration: 0.42, ease: "power3.out" });
		const pillY = gsap.quickTo(pill, "y", { duration: 0.42, ease: "power3.out" });
		const MAGNET = 0.32;

		let visible = false;
		let mode = "dot";

		const setMode = (next) => {
			if (mode === next) {
				return;
			}

			mode = next;

			if (next === "explore") {
				gsap.to(dot, { scale: 0.35, autoAlpha: 0, duration: 0.24, ease: "power2.out" });
				gsap.to(pill, { scale: 1, autoAlpha: 1, duration: 0.36, ease: "power3.out" });
			} else {
				gsap.to(dot, {
					scale: 1,
					autoAlpha: visible ? 0.85 : 0,
					duration: 0.3,
					ease: "power2.out",
				});
				gsap.to(pill, { scale: 0.7, autoAlpha: 0, duration: 0.24, ease: "power2.out" });
			}
		};

		const onMove = (event) => {
			if (!visible) {
				visible = true;

				if (mode === "dot") {
					gsap.to(dot, { autoAlpha: 0.85, duration: 0.25, ease: "power2.out" });
				}
			}

			let x = event.clientX;
			let y = event.clientY;
			const source = event.target instanceof Element ? event.target : null;
			const magnet = source?.closest("[data-magnetic]");

			if (magnet) {
				const rect = magnet.getBoundingClientRect();
				const cx = rect.left + rect.width / 2;
				const cy = rect.top + rect.height / 2;
				x += (cx - x) * MAGNET;
				y += (cy - y) * MAGNET;
			}

			dotX(x);
			dotY(y);
			pillX(x);
			pillY(y);

			const target = source?.closest('[data-cursor="explore"]');

			setMode(target ? "explore" : "dot");
		};

		const hide = () => {
			visible = false;
			gsap.to([dot, pill], { autoAlpha: 0, duration: 0.2, ease: "power2.out" });
		};

		window.addEventListener("pointermove", onMove, { passive: true });
		window.addEventListener("blur", hide);
		document.addEventListener("pointerleave", hide);

		return () => {
			delete html.dataset.cursorReady;
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("blur", hide);
			document.removeEventListener("pointerleave", hide);
			gsap.killTweensOf([dot, pill]);
		};
	}, []);

	return (
		<div
			aria-hidden="true"
			data-cursor-layer
			className="pointer-events-none fixed inset-0 z-[110]"
		>
			<span
				ref={dotRef}
				className="fixed left-0 top-0 size-2.5 rounded-full bg-[var(--accent)] opacity-0"
			/>
			<span
				ref={pillRef}
				className="fixed left-0 top-0 inline-flex items-center rounded-full border border-[var(--glass-border)] bg-[var(--glass)] px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink)] opacity-0 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.65)] backdrop-blur-xl rtl:font-arabic rtl:normal-case rtl:tracking-normal"
			>
				<span ref={labelRef}>{label}</span>
			</span>
		</div>
	);
}
