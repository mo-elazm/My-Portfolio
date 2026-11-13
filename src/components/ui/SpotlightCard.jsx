"use client";

import { useRef } from "react";
import { cn } from "@/utils/cn";

export default function SpotlightCard({
	as: Component = "div",
	className,
	children,
	...props
}) {
	const ref = useRef(null);

	const handlePointerMove = (event) => {
		const node = ref.current;

		if (!node) {
			return;
		}

		const rect = node.getBoundingClientRect();
		node.style.setProperty("--x", `${event.clientX - rect.left}px`);
		node.style.setProperty("--y", `${event.clientY - rect.top}px`);
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
