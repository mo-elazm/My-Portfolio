import { useEffect } from "react";
import { useTranslation } from "@/i18n";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export default function useSectionReveal() {
	const { language } = useTranslation();

	useGSAP(
		() => {
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				return undefined;
			}

			const media = gsap.matchMedia();

			media.add("(prefers-reduced-motion: no-preference)", () => {
				const elements = gsap.utils.toArray("[data-reveal]");

				elements.forEach((element) => {
					gsap.fromTo(
						element,
						{ y: 30, autoAlpha: 0, filter: "blur(9px)" },
						{
							y: 0,
							autoAlpha: 1,
							filter: "blur(0px)",
							duration: 1,
							ease: "power3.out",
							delay: Math.min(Number(element.dataset.revealDelay || 0), 0.3),
							scrollTrigger: {
								trigger: element,
								start: "top 90%",
								once: true,
							},
							onComplete: () => gsap.set(element, { clearProps: "filter" }),
						},
					);
				});

				gsap.utils.toArray("[data-reveal-group]").forEach((group) => {
					const items = group.querySelectorAll("[data-reveal-item]");
					if (!items.length) {
						return;
					}

					gsap.fromTo(
						items,
						{ y: 24, autoAlpha: 0 },
						{
							y: 0,
							autoAlpha: 1,
							duration: 0.85,
							stagger: 0.08,
							ease: "power3.out",
							scrollTrigger: {
								trigger: group,
								start: "top 86%",
								once: true,
							},
						},
					);
				});

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
					elements.forEach((element) => gsap.set(element, { clearProps: "filter" }));
				};
			});

			return () => media.revert();
		},
		{ dependencies: [language] },
	);

	useEffect(() => {
		const timer = window.setTimeout(() => ScrollTrigger.refresh(), 180);
		return () => window.clearTimeout(timer);
	}, [language]);
}
