"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/utils/cn";

export default function SpotlightCard({
	as: Component = "div",
	className,
	children,
	...props
}) {
	const ref = useRef(null);
	const coords = useRef({ x: 0, y: 0 });
	const moveX = useRef(null);
	const moveY = useRef(null);

	useEffect(() => {
		const node = ref.current;

		if (!node) {
			return undefined;
		}

		if (!window.matchMedia("(pointer: fine)").matches) {
			return undefined;
		}

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return undefined;
		}

		const target = coords.current;

		const apply = () => {
			node.style.setProperty("--x", `${target.x}px`);
			node.style.setProperty("--y", `${target.y}px`);
		};

		const options = { duration: 0.45, ease: "power3.out", onUpdate: apply };

		moveX.current = gsap.quickTo(target, "x", options);
		moveY.current = gsap.quickTo(target, "y", options);

		return () => {
			moveX.current = null;
			moveY.current = null;
			gsap.killTweensOf(target);
		};
	}, []);

	const handlePointerMove = (event) => {
		const node = ref.current;

		if (!node || !moveX.current) {
			return;
		}

		const rect = node.getBoundingClientRect();

		moveX.current(event.clientX - rect.left);
		moveY.current(event.clientY - rect.top);
	};

	return (
		<Component
			ref={ref}
			onPointerMove={handlePointerMove}
			className={cn("spotlight-card", className)}
			{...props}
		>
			{children}
		</Component>
	);
}
