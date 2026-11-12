import { useEffect, useRef } from "react";
import { useTranslation } from "@/i18n";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const REVEAL_FROM = { y: 26, autoAlpha: 0, filter: "blur(8px)" };
const OBSERVER_OPTIONS = { rootMargin: "0px 0px 0px 0px", threshold: 0 };

export default function useSectionReveal() {
	const { language } = useTranslation();
	const revealed = useRef(new WeakSet());

	useGSAP(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return undefined;
		}

		const elements = gsap.utils.toArray("[data-reveal]");
		const pending = elements.filter((element) => !revealed.current.has(element));
		const settled = elements.filter((element) => revealed.current.has(element));

		if (settled.length) {
			gsap.set(settled, { y: 0, autoAlpha: 1, filter: "blur(0px)" });
		}

		const reveal = (element, delay = 0) => {
			revealed.current.add(element);
			gsap.to(element, {
				y: 0,
				autoAlpha: 1,
				filter: "blur(0px)",
				duration: 0.95,
				delay,
				ease: "power3.out",
				onComplete: () => gsap.set(element, { clearProps: "filter" }),
			});
		};

		if (typeof IntersectionObserver === "undefined") {
			gsap.set(pending, { y: 0, autoAlpha: 1, filter: "blur(0px)" });
			return undefined;
		}

		gsap.set(pending, REVEAL_FROM);

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}

				observer.unobserve(entry.target);
				reveal(
					entry.target,
					Math.min(Number(entry.target.dataset.revealDelay || 0), 0.3),
				);
			});
		}, OBSERVER_OPTIONS);

		pending.forEach((element) => observer.observe(element));

		const groups = gsap.utils.toArray("[data-reveal-group]");
		const groupObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}

				groupObserver.unobserve(entry.target);
				const items = [...entry.target.querySelectorAll("[data-reveal-item]")].filter(
					(item) => !revealed.current.has(item),
				);

				if (!items.length) {
					return;
				}

				items.forEach((item) => revealed.current.add(item));
				gsap.fromTo(
					items,
					{ y: 22, autoAlpha: 0 },
					{
						y: 0,
						autoAlpha: 1,
						duration: 0.8,
						stagger: 0.08,
						ease: "power3.out",
					},
				);
			});
		}, OBSERVER_OPTIONS);

		groups.forEach((group) => groupObserver.observe(group));

		gsap.utils.toArray("[data-parallax]").forEach((element) => {
			const amount = Number(element.dataset.parallax || 24);

			gsap.fromTo(
				element,
				{ yPercent: -amount / 2 },
				{
					yPercent: amount / 2,
					ease: "none",
					scrollTrigger: {
						trigger: element.parentElement || element,
						start: "top bottom",
						end: "bottom top",
						scrub: 1.1,
					},
				},
			);
		});

		return () => {
			observer.disconnect();
			groupObserver.disconnect();
		};
	}, []);

	useEffect(() => {
		const timer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
		return () => window.clearTimeout(timer);
	}, [language]);
}
