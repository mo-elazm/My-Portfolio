import { cn } from "@/utils/cn";

export default function SectionHeading({
	eyebrow,
	number,
	title,
	description,
	align = "start",
	className,
	titleClassName,
}) {
	return (
		<div
			data-reveal
			className={cn(
				"max-w-2xl",
				align === "center" && "mx-auto text-center",
				className,
			)}
		>
			<div
				className={cn(
					"flex items-center gap-3",
					align === "center" && "justify-center",
				)}
			>
				<span className="font-mono text-[11px] font-medium text-accent-text">
					{number}
				</span>
				<span className="h-px w-8 bg-line-strong" aria-hidden="true" />
				<span className="eyebrow-label">{eyebrow}</span>
			</div>

			<h2
				className={cn(
					"mt-5 font-display text-[clamp(2.1rem,4.6vw,3.5rem)] font-bold leading-[1.04] tracking-[-0.04em] text-balance text-ink rtl:leading-[1.2] rtl:tracking-[-0.015em]",
					titleClassName,
				)}
			>
				{title}
			</h2>

			{description ? (
				<p className="mt-4 max-w-xl text-pretty text-[0.95rem] leading-7 text-muted sm:text-base sm:leading-8">
					{description}
				</p>
			) : null}
		</div>
	);
}
