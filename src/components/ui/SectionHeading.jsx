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
				"max-w-3xl",
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
				<span className="font-mono text-[11px] font-bold text-accent-text">
					({number})
				</span>
				<span
					className="h-px w-10 bg-gradient-to-r from-accent-text/60 to-transparent rtl:bg-gradient-to-l"
					aria-hidden="true"
				/>
				<span className="eyebrow-label">{eyebrow}</span>
			</div>

			<h2
				className={cn(
					"mt-5 font-display text-[clamp(2.35rem,5vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-balance text-ink",
					titleClassName,
				)}
			>
				{title}
			</h2>

			{description ? (
				<p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-muted sm:text-[1.05rem] sm:leading-8">
					{description}
				</p>
			) : null}
		</div>
	);
}
