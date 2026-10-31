import { cn } from "@/utils/cn";

export default function TechIcon({ tech, className }) {
	if (tech.mark) {
		return (
			<span
				aria-hidden="true"
				className={cn(
					"inline-grid shrink-0 place-items-center rounded-[6px] bg-accent-soft font-display text-[11px] font-bold leading-none text-accent-text",
					className,
				)}
			>
				{tech.mark}
			</span>
		);
	}

	const Icon = tech.icon;
	return <Icon aria-hidden="true" className={cn("shrink-0", className)} />;
}
