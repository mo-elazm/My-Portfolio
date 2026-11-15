"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const PILLARS = [
	"NEXT.JS 16",
	"REACT",
	"TYPESCRIPT",
	"GSAP",
	"THREE.JS",
	"SUPABASE",
	"NODE.JS",
	"SYSTEM ARCHITECTURE",
];

const wrapOffset = (value) => {
	let next = value % 50;

	if (next > 0) {
		next -= 50;
	}

	return next;
};

function Row({ pillars, variant, trackRef }) {
	const isDisplay = variant === "display";

	return (
		<div dir="ltr" className="overflow-hidden">
			<div
				ref={trackRef}
				data-marquee-track
				className="flex w-max items-center will-change-transform"
			>
				{[...pillars, ...pillars].map((pillar, index) => (
					<span
						key={`${variant}-${pillar}-${index}`}
						className={
							isDisplay
								? "me-8 flex items-center gap-8 whitespace-nowrap font-display text-[clamp(1.7rem,3.8vw,3rem)] font-extrabold uppercase leading-none tracking-[-0.035em] text-ink/[0.07] dark:text-white/[0.06]"
								: "me-6 flex items-center gap-6 whitespace-nowrap font-mono text-[9px] font-medium uppercase tracking-[0.34em] text-muted/45 sm:text-[10px]"
						}
					>
						{pillar}
						<span
							aria-hidden="true"
							className={
								isDisplay
									? "size-1.5 rounded-full bg-accent/25"
									: "size-1 rounded-full bg-accent/40"
							}
						/>
					</span>
				))}
			</div>
		</div>
	);
}

export default function EngineeringMarquee() {
	const root = useRef(null);
	const trackA = useRef(null);
	const trackB = useRef(null);

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return undefined;
		}

		const node = root.current;
		const rowA = trackA.current;
		const rowB = trackB.current;

		if (!node || !rowA || !rowB) {
			return undefined;
		}

		const motion = { direction: 1, timeScale: 1 };
		const target = { direction: 1, timeScale: 1 };
		let offsetA = 0;
		let offsetB = -25;

		const trigger = ScrollTrigger.create({
			trigger: node,
			start: "top bottom",
			end: "bottom top",
			onUpdate: (self) => {
				const velocity = self.getVelocity();

				target.direction = velocity < 0 ? -1 : 1;
				target.timeScale = gsap.utils.clamp(
					1,
					4.5,
					1 + Math.abs(velocity) / 1600,
				);
			},
			onLeave: () => {
				target.direction = 1;
				target.timeScale = 1;
			},
			onLeaveBack: () => {
				target.direction = 1;
				target.timeScale = 1;
			},
		});

		const tick = () => {
			const delta = Math.min(gsap.ticker.deltaRatio(60), 3);

			motion.direction += (target.direction - motion.direction) * 0.08;
			motion.timeScale += (target.timeScale - motion.timeScale) * 0.08;

			const step = 0.05 * motion.direction * motion.timeScale * delta;

			offsetA = wrapOffset(offsetA - step);
			offsetB = wrapOffset(offsetB + step * 0.78);

			gsap.set(rowA, { xPercent: offsetA });
			gsap.set(rowB, { xPercent: offsetB });
		};

		gsap.ticker.add(tick);

		return () => {
			gsap.ticker.remove(tick);
			trigger.kill();
		};
	}, []);

	return (
		<div
			ref={root}
			data-marquee
			aria-hidden="true"
			className="relative z-10 overflow-hidden border-t border-line bg-canvas/30 py-6 backdrop-blur-[2px] sm:py-8"
		>
			<Row pillars={PILLARS} variant="display" trackRef={trackA} />
			<div className="mt-3">
				<Row pillars={PILLARS} variant="mono" trackRef={trackB} />
			</div>
		</div>
	);
}
