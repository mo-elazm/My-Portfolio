export default function Marquee({ items }) {
	return (
		<div
			aria-hidden="true"
			dir="ltr"
			className="marquee-track relative overflow-hidden border-y border-line/70 bg-surface/35 backdrop-blur-md"
		>
			<div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-16 bg-gradient-to-r from-canvas to-transparent sm:w-28" />
			<div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-16 bg-gradient-to-l from-canvas to-transparent sm:w-28" />
			<div className="animate-marquee flex w-max">
				{[0, 1].map((group) => (
					<div key={group} className="flex shrink-0 items-center">
						{items.map((item) => (
							<div
								key={`${group}-${item}`}
								className="flex items-center gap-7 px-7 py-5 sm:gap-9 sm:px-9"
							>
								<span className="text-lg leading-none text-accent-text">✳</span>
								<span className="whitespace-nowrap font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-muted sm:text-xs">
									{item}
								</span>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
