"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useTranslation } from "@/i18n";
import useAppStore from "@/store/useAppStore";

const STORAGE_KEY = "portfolio_intro_seen";

export default function Preloader() {
	const { t } = useTranslation();
	const root = useRef(null);
	const counter = useRef(null);
	const bar = useRef(null);
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

					if (bar.current) {
						bar.current.style.transform = `scaleX(${value / 100})`;
					}
				},
			});

			timeline.addLabel("exit", "+=0.08");

			timeline.call(
				() => {
					html.dataset.intro = "exit";
					markIntroReady();
				},
				null,
				"exit",
			);

			timeline.to(
				".preloader-inner",
				{ autoAlpha: 0, y: -24, duration: 0.4, ease: "power2.in" },
				"exit",
			);

			timeline.to(
				".preloader-panel",
				{
					yPercent: -100,
					duration: 0.85,
					ease: "power4.inOut",
					stagger: 0.08,
				},
				"exit",
			);

			timeline.call(
				() => {
					html.dataset.intro = "done";
					endIntro();
				},
				null,
				"exit+=0.9",
			);
		}, root);

		return () => context.revert();
	}, [completeIntro, endIntro, markIntroReady, setIntroActive]);

	return (
		<div
			ref={root}
			data-preloader
			aria-hidden="true"
			className="fixed inset-0 z-[120] items-center justify-center overflow-hidden bg-[#09090B]"
		>
			<div className="preloader-panel absolute inset-x-0 top-0 h-[52%] bg-[#09090B]" />
			<div className="preloader-panel absolute inset-x-0 bottom-0 h-[48%] bg-[#09090B]" />

			<div className="preloader-inner absolute inset-0 z-10 flex flex-col items-center justify-center gap-9">
				<div className="relative grid size-24 place-items-center">
					<span
						aria-hidden="true"
						className="absolute inset-0 rounded-[2rem] bg-indigo-500/25 blur-2xl"
					/>
					<span
						aria-hidden="true"
						className="absolute inset-3 rounded-full border border-indigo-400/20"
					/>
					<span className="relative font-display text-5xl font-extrabold leading-none tracking-[-0.06em] text-white">
						{t.preloader.monogram}
					</span>
				</div>

				<div className="flex flex-col items-center gap-4">
					<p
						ref={counter}
						className="font-mono text-[11px] font-medium tabular-nums tracking-[0.32em] text-white/60"
					>
						00%
					</p>
					<div className="h-px w-40 overflow-hidden bg-white/10">
						<span
							ref={bar}
							className="block h-full w-full origin-left scale-x-0 bg-indigo-400/80 rtl:origin-right"
						/>
					</div>
					<p className="font-mono text-[9px] font-medium uppercase tracking-[0.28em] text-white/30">
						{t.preloader.label}
					</p>
				</div>
			</div>
		</div>
	);
}
