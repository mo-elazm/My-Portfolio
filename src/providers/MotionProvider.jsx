"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { resetScrollState, scrollState } from "@/lib/scrollState";
import { usePreferences } from "@/providers/PreferencesProvider";
import useAppStore from "@/store/useAppStore";

export default function MotionProvider({ children }) {
	const lenisRef = useRef(null);
	const introActive = useAppStore((state) => state.introActive);
	const mobileMenuOpen = useAppStore((state) => state.mobileMenuOpen);
	const activeCertificate = useAppStore((state) => state.activeCertificate);
	const { language } = usePreferences();
	const pathname = usePathname();
	const previousPath = useRef(pathname);

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return undefined;
		}

		const lenis = new Lenis({
			lerp: 0.085,
			smoothWheel: true,
			wheelMultiplier: 1,
			touchMultiplier: 1.35,
			syncTouch: false,
			autoRaf: false,
		});

		lenisRef.current = lenis;

		const onScroll = ({ velocity }) => {
			scrollState.velocity = velocity;
			scrollState.progress = lenis.progress;
			ScrollTrigger.update();
		};

		const tick = (time) => {
			lenis.raf(time * 1000);
		};

		lenis.on("scroll", onScroll);
		gsap.ticker.add(tick);
		gsap.ticker.lagSmoothing(0);

		const refresh = () => ScrollTrigger.refresh();
		const refreshTimer = window.setTimeout(refresh, 320);

		document.fonts?.ready?.then(refresh).catch(() => {});
		window.addEventListener("load", refresh, { once: true });

		return () => {
			window.clearTimeout(refreshTimer);
			window.removeEventListener("load", refresh);
			gsap.ticker.remove(tick);
			lenis.off("scroll", onScroll);
			lenis.destroy();
			lenisRef.current = null;
			resetScrollState();
		};
	}, []);

	useEffect(() => {
		const lenis = lenisRef.current;

		if (!lenis) {
			return;
		}

		const paused = introActive || mobileMenuOpen || Boolean(activeCertificate);

		if (paused) {
			lenis.stop();
		} else {
			lenis.start();
		}
	}, [introActive, mobileMenuOpen, activeCertificate]);

	useEffect(() => {
		const onClick = (event) => {
			if (
				event.defaultPrevented ||
				event.button !== 0 ||
				event.metaKey ||
				event.ctrlKey ||
				event.shiftKey ||
				event.altKey
			) {
				return;
			}

			const anchor = event.target.closest?.('a[href^="#"]');

			if (!anchor) {
				return;
			}

			const hash = anchor.getAttribute("href");

			if (!hash || hash === "#") {
				return;
			}

			const target = document.querySelector(hash);

			if (!target) {
				return;
			}

			event.preventDefault();

			const lenis = lenisRef.current;

			if (lenis) {
				lenis.scrollTo(target, { offset: -84, duration: 1.15 });
			} else {
				target.scrollIntoView({ behavior: "smooth", block: "start" });
			}

			window.history.replaceState(null, "", hash);
		};

		document.addEventListener("click", onClick);

		return () => document.removeEventListener("click", onClick);
	}, []);

	useEffect(() => {
		const lenis = lenisRef.current;

		if (!lenis) {
			return undefined;
		}

		lenis.resize();

		const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());

		return () => window.cancelAnimationFrame(frame);
	}, [language]);

	useEffect(() => {
		const lenis = lenisRef.current;

		if (previousPath.current === pathname) {
			return;
		}

		previousPath.current = pathname;
		lenis?.scrollTo(0, { immediate: true });
		ScrollTrigger.refresh();
	}, [pathname]);

	return children;
}
