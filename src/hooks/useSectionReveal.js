import { useEffect } from "react";
import { useTranslation } from "@/i18n";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const FROM = { y: 20, opacity: 0 };
const TO = { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" };

export default function useSectionReveal() {
	const { language } = useTranslation();

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return undefined;
		}

		let cancelled = false;

		const context = gsap.context(() => {
			gsap.utils.toArray("[data-reveal]").forEach((element) => {
				gsap.fromTo(element, FROM, {
					...TO,
					scrollTrigger: {
						trigger: element,
						start: "top 90%",
						once: true,
					},
				});
			});

			gsap.utils.toArray("[data-reveal-group]").forEach((group) => {
				const items = gsap.utils.toArray("[data-reveal-item]", group);

				if (!items.length) {
					return;
				}

				gsap.fromTo(items, FROM, {
					...TO,
					stagger: 0.1,
					scrollTrigger: {
						trigger: group,
						start: "top 88%",
						once: true,
					},
				});
			});
		});

		const refresh = () => {
			if (!cancelled) {
				ScrollTrigger.refresh();
			}
		};

		const timer = window.setTimeout(refresh, 250);

		document.fonts?.ready?.then(refresh).catch(() => {});
		window.addEventListener("load", refresh, { once: true });

		return () => {
			cancelled = true;
			window.clearTimeout(timer);
			window.removeEventListener("load", refresh);
			context.revert();
		};
	}, [language]);
}
