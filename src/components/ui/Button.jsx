"use client";

import { useEffect, useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { gsap } from "@/lib/gsap";
import { cn } from "@/utils/cn";

const variants = {
	primary: "btn-primary",
	secondary: "btn-secondary",
	ghost: "btn-ghost",
};

export default function Button({
	as: Component = "a",
	href,
	children,
	variant = "primary",
	icon = true,
	className,
	...props
}) {
	const ref = useRef(null);
	const moveX = useRef(null);
	const moveY = useRef(null);
	const magnetic = variant === "primary" || props["data-magnetic"] !== undefined;

	useEffect(() => {
		const node = ref.current;

		if (!node || !magnetic) {
			return undefined;
		}

		if (!window.matchMedia("(pointer: fine)").matches) {
			return undefined;
		}

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return undefined;
		}

		moveX.current = gsap.quickTo(node, "x", { duration: 0.45, ease: "power3.out" });
		moveY.current = gsap.quickTo(node, "y", { duration: 0.45, ease: "power3.out" });

		return () => {
			moveX.current = null;
			moveY.current = null;
			gsap.killTweensOf(node);
			gsap.set(node, { clearProps: "transform" });
		};
	}, [magnetic]);

	const handlePointerMove = (event) => {
		if (!magnetic || !ref.current || !moveX.current) {
			return;
		}

		const rect = ref.current.getBoundingClientRect();
		const x = gsap.utils.clamp(-10, 10, (event.clientX - rect.left - rect.width / 2) * 0.22);
		const y = gsap.utils.clamp(-8, 8, (event.clientY - rect.top - rect.height / 2) * 0.28);

		moveX.current(x);
		moveY.current(y);
	};

	const resetMagnet = () => {
		if (!magnetic || !ref.current || !moveX.current) {
			return;
		}

		gsap.to(ref.current, { x: 0, y: 0, duration: 0.85, ease: "elastic.out(1, 0.35)" });
	};

	return (
		<Component
			ref={ref}
			href={href}
			onPointerMove={handlePointerMove}
			onPointerLeave={resetMagnet}
			onPointerCancel={resetMagnet}
			className={cn("btn group", variants[variant], className)}
			{...props}
			data-magnetic={magnetic ? "" : undefined}
		>
			<span className="inline-flex items-center gap-2">{children}</span>
			{icon ? (
				<FiArrowUpRight
					aria-hidden="true"
					className="size-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
				/>
			) : null}
		</Component>
	);
}
