"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const splitValue = (value) => {
	const match = String(value).match(/^(\D*?)(\d+)([\s\S]*)$/);

	if (!match) {
		return null;
	}

	return {
		prefix: match[1],
		number: Number(match[2]),
		suffix: match[3],
	};
};

export default function CountUp({ value, className, duration = 1.35 }) {
	const ref = useRef(null);

	useEffect(() => {
		const node = ref.current;
		const parts = splitValue(value);

		if (!node || !parts) {
			return undefined;
		}

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			node.textContent = value;
			return undefined;
		}

		const state = { value: 0 };
		const context = gsap.context(() => {
			gsap.to(state, {
				value: parts.number,
				duration,
				ease: "power2.out",
				scrollTrigger: {
					trigger: node,
					start: "top 92%",
					once: true,
				},
				onUpdate: () => {
					node.textContent = `${parts.prefix}${Math.round(state.value)}${parts.suffix}`;
				},
				onComplete: () => {
					node.textContent = value;
				},
			});
		}, ref);

		return () => context.revert();
	}, [value, duration]);

	return (
		<span ref={ref} className={className} aria-label={value}>
			{value}
		</span>
	);
}
