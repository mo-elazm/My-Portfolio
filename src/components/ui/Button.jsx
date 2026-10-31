import { FiArrowUpRight } from "react-icons/fi";
import { cn } from "@/utils/cn";

const variants = {
	primary:
		"border border-transparent bg-accent text-[#0a100b] shadow-[0_18px_44px_-22px_var(--glow)] hover:-translate-y-0.5 hover:bg-ink hover:text-canvas",
	secondary:
		"glass-chip text-ink hover:-translate-y-0.5 hover:border-accent-text/45 hover:text-accent-text",
	ghost: "border border-transparent text-ink hover:bg-ink/[0.06]",
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
			className={cn(
				"group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 focus-visible:outline-none",
				variants[variant],
				className,
			)}
			{...props}
		>
			<span>{children}</span>
			{icon ? (
				<FiArrowUpRight
					aria-hidden="true"
					className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
				/>
			) : null}
		</Component>
	);
}
