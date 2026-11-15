"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/utils/cn";

const TILT_RANGE = 4;

export default function SpotlightCard({
	as: Component = "div",
	className,
	children,
	tilt = false,
	...props
}) {
	const ref = useRef(null);
	const coords = useRef({ x: 0, y: 0 });
	const moveX = useRef(null);
	const moveY = useRef(null);
	const rotateX = useRef(null);
	const rotateY = useRef(null);

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

		if (tilt) {
			gsap.set(node, {
				transformPerspective: 1200,
				transformOrigin: "50% 50%",
				transformStyle: "preserve-3d",
			});

			const tiltOptions = { duration: 0.55, ease: "power3.out" };

			rotateX.current = gsap.quickTo(node, "rotationX", tiltOptions);
			rotateY.current = gsap.quickTo(node, "rotationY", tiltOptions);
		}

		return () => {
			moveX.current = null;
			moveY.current = null;
			rotateX.current = null;
			rotateY.current = null;
			gsap.killTweensOf(target);
			gsap.killTweensOf(node);
		};
	}, [tilt]);

	const handlePointerMove = (event) => {
		const node = ref.current;

		if (!node || !moveX.current) {
			return;
		}

		const rect = node.getBoundingClientRect();
		const offsetX = event.clientX - rect.left;
		const offsetY = event.clientY - rect.top;

		moveX.current(offsetX);
		moveY.current(offsetY);

		if (rotateX.current && rotateY.current) {
			const px = offsetX / rect.width - 0.5;
			const py = offsetY / rect.height - 0.5;

			rotateY.current(px * TILT_RANGE * 2);
			rotateX.current(-py * TILT_RANGE * 2);
		}
	};

	const handlePointerLeave = () => {
		if (!rotateX.current || !rotateY.current) {
			return;
		}

		rotateX.current(0);
		rotateY.current(0);
	};

	return (
		<Component
			ref={ref}
			onPointerMove={handlePointerMove}
			onPointerLeave={handlePointerLeave}
			data-tilt={tilt ? "" : undefined}
			className={cn("spotlight-card", className)}
			{...props}
		>
			{children}
		</Component>
	);
}
