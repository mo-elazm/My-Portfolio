"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useTranslation } from "@/i18n";
import { cn } from "@/utils/cn";

/**
 * Splits text into words only — never characters — so Arabic cursive joins
 * stay intact. Each word illuminates as the block scrubs through the viewport.
 */
export default function ScrollWords({ text, className, as: Tag = "span" }) {
	const ref = useRef(null);
	const { language } = useTranslation();

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return undefined;
		}

		const node = ref.current;

		if (!node) {
			return undefined;
		}

		const words = node.querySelectorAll("[data-word]");

		if (!words.length) {
			return undefined;
		}

		const context = gsap.context(() => {
			gsap.fromTo(
				words,
				{ opacity: 0.18 },
				{
					opacity: 1,
					ease: "none",
					stagger: 0.08,
					scrollTrigger: {
						trigger: node,
						start: "top 82%",
						end: "bottom 55%",
						scrub: 0.6,
					},
				},
			);
		}, node);

		return () => context.revert();
	}, [text, language]);

	const words = text.split(/\s+/).filter(Boolean);

	return (
		<Tag ref={ref} className={cn(className)}>
			{words.map((word, index) => (
				<span key={`${word}-${index}`}>
					<span data-word>{word}</span>
					{index < words.length - 1 ? " " : ""}
				</span>
			))}
		</Tag>
	);
}
