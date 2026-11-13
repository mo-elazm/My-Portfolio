"use client";

import { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
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
	const magnetic = variant === "primary";

	const handlePointerMove = (event) => {
		if (!magnetic || !ref.current) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const rect = ref.current.getBoundingClientRect();
		const x = (event.clientX - rect.left - rect.width / 2) * 0.14;
		const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
		const clamp = (value) => Math.max(-6, Math.min(6, value));

		ref.current.style.transform = `translate3d(${clamp(x)}px, ${clamp(y)}px, 0)`;
	};

	const resetMagnet = () => {
		if (ref.current) {
			ref.current.style.transform = "";
		}
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
