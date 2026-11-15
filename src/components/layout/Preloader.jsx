"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useTranslation } from "@/i18n";
import useAppStore from "@/store/useAppStore";

const STORAGE_KEY = "portfolio_intro_seen";
const RADIUS = 72;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Preloader() {
	const { t } = useTranslation();
	const root = useRef(null);
	const counter = useRef(null);
	const ring = useRef(null);
	const completeIntro = useAppStore((state) => state.completeIntro);
	const markIntroReady = useAppStore((state) => state.markIntroReady);
	const endIntro = useAppStore((state) => state.endIntro);
	const setIntroActive = useAppStore((state) => state.setIntroActive);

	useEffect(() => {
		const html = document.documentElement;
		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const shouldPlay = html.dataset.intro === "pending" && !reduceMotion;

		if (!shouldPlay) {
			html.dataset.intro = "done";
			completeIntro();
			return undefined;
		}

		try {
			sessionStorage.setItem(STORAGE_KEY, "1");
		} catch {
			// Private mode: fall through and play the intro once.
		}

		setIntroActive(true);

		const state = { value: 0 };

		const context = gsap.context(() => {
			const timeline = gsap.timeline();

			timeline.to(state, {
				value: 100,
				duration: 1.2,
				ease: "power2.inOut",
				onUpdate: () => {
					const value = Math.round(state.value);

					if (counter.current) {
						counter.current.textContent = `${String(value).padStart(2, "0")}%`;
					}

					if (ring.current) {
						ring.current.style.strokeDashoffset = String(
							CIRCUMFERENCE * (1 - value / 100),
						);
					}
				},
			});

			timeline.addLabel("exit", "+=0.06");

			timeline.call(
				() => {
					html.dataset.intro = "exit";
					markIntroReady();
				},
				null,
				"exit",
			);

			// Collapse the emblem first, then split the curtain into two shutters.
			timeline.to(
				".preloader-emblem",
				{ scale: 0.9, duration: 0.34, ease: "power2.in" },
				"exit",
			);

			timeline.to(
				".preloader-inner",
				{ autoAlpha: 0, duration: 0.3, ease: "power2.in" },
				"exit+=0.04",
			);

			timeline.to(
				".preloader-top",
				{ yPercent: -100, duration: 0.8, ease: "expo.inOut" },
				"exit+=0.14",
			);

			timeline.to(
				".preloader-bottom",
				{ yPercent: 100, duration: 0.8, ease: "expo.inOut" },
				"exit+=0.14",
			);

			timeline.call(
				() => {
					html.dataset.intro = "done";
					endIntro();
				},
				null,
				"exit+=0.98",
			);
		}, root);

		return () => context.revert();
	}, [completeIntro, endIntro, markIntroReady, setIntroActive]);

	return (
		<div
			ref={root}
			data-preloader
			aria-hidden="true"
			className="fixed inset-0 z-[120] items-center justify-center overflow-hidden"
		>
			<div className="preloader-top absolute inset-x-0 top-0 h-1/2 bg-[#09090B] will-change-transform" />
			<div className="preloader-bottom absolute inset-x-0 bottom-0 h-1/2 bg-[#09090B] will-change-transform" />

			<div className="preloader-inner absolute inset-0 z-10 flex flex-col items-center justify-center px-6">
				<p className="font-mono text-[9px] font-medium uppercase tracking-[0.34em] text-white/35">
					{t.preloader.coordinates}
				</p>

				<div className="preloader-emblem relative mt-7 grid size-[168px] place-items-center">
					<span
						aria-hidden="true"
						className="absolute inset-6 rounded-full bg-indigo-500/20 blur-2xl"
					/>

					<svg
						aria-hidden="true"
						viewBox="0 0 168 168"
						className="absolute inset-0 size-full -rotate-90"
					>
						<circle
							cx="84"
							cy="84"
							r="82"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeDasharray="1 7"
							className="text-white/15"
						/>
						<circle
							cx="84"
							cy="84"
							r={RADIUS}
							fill="none"
							stroke="currentColor"
							strokeWidth="1"
							className="text-white/10"
						/>
						<circle
							ref={ring}
							cx="84"
							cy="84"
							r={RADIUS}
							fill="none"
							stroke="#6366F1"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeDasharray={CIRCUMFERENCE}
							strokeDashoffset={CIRCUMFERENCE}
							className="preloader-ring"
						/>
						<g stroke="currentColor" strokeWidth="1" className="text-white/30">
							<line x1="84" y1="0" x2="84" y2="7" />
							<line x1="84" y1="161" x2="84" y2="168" />
							<line x1="0" y1="84" x2="7" y2="84" />
							<line x1="161" y1="84" x2="168" y2="84" />
						</g>
					</svg>

					<span className="relative font-display text-6xl font-extrabold leading-none tracking-[-0.06em] text-white">
						{t.preloader.monogram}
					</span>
				</div>

				<p
					ref={counter}
					className="mt-7 font-mono text-[11px] font-medium tabular-nums tracking-[0.32em] text-white/65"
				>
					00%
				</p>

				<p className="mt-5 font-mono text-[9px] font-medium uppercase tracking-[0.28em] text-white/30">
					{t.preloader.label}
				</p>
			</div>
		</div>
	);
}
