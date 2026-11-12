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
	return (
		<Component
			href={href}
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
