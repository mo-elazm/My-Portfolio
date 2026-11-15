"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { astrolabeState, resetAstrolabeState } from "@/lib/astrolabeState";
import { usePreferences } from "@/providers/PreferencesProvider";
import useAppStore from "@/store/useAppStore";

const HeroScene3D = dynamic(() => import("@/components/HeroScene3D"), {
	ssr: false,
	loading: () => null,
});

// The camera is fixed at z = 8.5 with a 42° vertical FOV, so the visible
// world height is always 2 * tan(21°) * 8.5. Anchors below are viewport
// fractions; the helper converts them into offsets from the scene's base.
const WORLD_HEIGHT = 2 * Math.tan((42 * Math.PI) / 360) * 8.5;

function createAnchor(worldWidth, baseX, baseY) {
	return (anchorX, anchorY) => ({
		offsetX: (anchorX - 0.5) * worldWidth - baseX,
		offsetY: (0.5 - anchorY) * WORLD_HEIGHT - baseY,
	});
}

export default function AstrolabeBackground() {
	const { theme } = usePreferences();
	const layer = useRef(null);
	const introDone = useAppStore((state) => state.introDone);
	const introWasPending = useRef(false);

	useEffect(() => {
		introWasPending.current =
			document.documentElement.dataset.intro === "pending";
	}, []);

	// Spin the sculpture into place as the dual shutters open.
	useEffect(() => {
		if (!introDone || !introWasPending.current) {
			return undefined;
		}

		introWasPending.current = false;

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			astrolabeState.spin = 0;
			return undefined;
		}

		const tween = gsap.fromTo(
			astrolabeState,
			{ spin: 1.6 },
			{ spin: 0, duration: 1.8, ease: "power3.out", overwrite: "auto" },
		);

		return () => tween.kill();
	}, [introDone]);

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return undefined;
		}

		const node = layer.current;

		if (!node) {
			return undefined;
		}

		let context = null;
		let rebuildTimer = 0;

		const build = () => {
			context?.revert();

			context = gsap.context(() => {
				const compact = window.matchMedia("(max-width: 1023px)").matches;
				const worldWidth = WORLD_HEIGHT * (window.innerWidth / window.innerHeight);
				const baseX = compact ? 0 : Math.min(2.35, worldWidth * 0.23);
				const baseY = compact ? -0.85 : 1.82;
				const anchor = createAnchor(worldWidth, baseX, baseY);

				const heroOpacity = compact ? 0.42 : 1;
				const softOpacity = compact ? 0.3 : 0.46;
				const wideOpacity = compact ? 0.2 : 0.3;
				const endOpacity = compact ? 0.34 : 0.56;
				const soft = {
					...anchor(compact ? 0.5 : 0.27, compact ? 0.56 : 0.44),
					scale: compact ? 0.92 : 0.95,
					tiltX: compact ? 0.12 : 0.34,
					tiltZ: compact ? 0 : -0.12,
				};
				const wide = {
					...anchor(0.5, 0.5),
					scale: compact ? 1.04 : 1.18,
					tiltX: -0.18,
					tiltZ: 0.08,
				};
				const end = {
					...anchor(0.5, compact ? 0.58 : 0.54),
					scale: compact ? 1 : 1.05,
					tiltX: 0.06,
					tiltZ: 0,
				};

				const doc = document.documentElement;
				const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
				const progressOf = (selector, fallback) => {
					const element = document.querySelector(selector);

					if (!element) {
						return fallback;
					}

					const top = element.getBoundingClientRect().top + window.scrollY;

					return Math.max(0, Math.min(1, top / maxScroll));
				};

				const aboutAt = progressOf("#about", 0.14);
				const skillsAt = progressOf("#skills", 0.46);
				const contactAt = progressOf("#contact", 0.9);

				gsap.set(astrolabeState, {
					offsetX: 0,
					offsetY: 0,
					scale: 1,
					tiltX: 0,
					tiltZ: 0,
					spin: 0,
				});
				gsap.set(node, { opacity: heroOpacity });

				const timeline = gsap.timeline({
					defaults: { ease: "none" },
					scrollTrigger: {
						trigger: doc,
						start: "top top",
						end: "bottom bottom",
						scrub: 1.2,
						invalidateOnRefresh: true,
					},
				});

				const step = (target, vars, from, to) => {
					const start = Math.max(0, Math.min(1, from));
					const finish = Math.max(start + 0.01, Math.min(1, to));

					timeline.to(
						target,
						{ ...vars, duration: finish - start },
						start,
					);
				};

				// Hero → About/Experience: glide to the opposite flank and soften.
				step(astrolabeState, soft, 0.02, aboutAt);
				step(node, { opacity: softOpacity }, 0.02, aboutAt);

				// Experience → Stack/Work: settle into a centred wireframe backdrop.
				step(astrolabeState, wide, skillsAt - 0.06, skillsAt + 0.02);
				step(node, { opacity: wideOpacity }, skillsAt - 0.06, skillsAt + 0.02);

				// Work → Contact: glide back behind the closing CTA.
				step(astrolabeState, end, contactAt - 0.06, contactAt + 0.02);
				step(node, { opacity: endOpacity }, contactAt - 0.06, contactAt + 0.02);

				// Pin the timeline duration to exactly 1 so progress maps 1:1.
				timeline.to({}, { duration: 0.001 }, 1);
			});
		};

		const scheduleRebuild = () => {
			window.clearTimeout(rebuildTimer);
			rebuildTimer = window.setTimeout(() => {
				build();
				ScrollTrigger.refresh();
			}, 220);
		};

		build();

		const refresh = () => ScrollTrigger.refresh();

		document.fonts?.ready?.then(scheduleRebuild).catch(() => {});
		window.addEventListener("load", scheduleRebuild, { once: true });
		window.addEventListener("resize", scheduleRebuild);

		return () => {
			window.clearTimeout(rebuildTimer);
			window.removeEventListener("load", scheduleRebuild);
			window.removeEventListener("resize", scheduleRebuild);
			context?.revert();
			resetAstrolabeState();
			gsap.set(node, { clearProps: "opacity" });
			refresh();
		};
	}, []);

	return (
		<div
			ref={layer}
			aria-hidden="true"
			className="astrolabe-layer pointer-events-none fixed inset-0 z-[1] opacity-40 lg:opacity-100"
		>
			<HeroScene3D theme={theme} className="hero-scene-mask" />
		</div>
	);
}
