"use client";

import { useTranslation } from "@/i18n";
import { cn } from "@/utils/cn";

export default function Logo({ className, onClick, compact = false }) {
	const { t } = useTranslation();

	return (
		<a
			href="#home"
			onClick={onClick}
			className={cn("group flex shrink-0 items-center gap-2.5", className)}
		>
			<span className="sr-only">{t.common.name}</span>
			<span
				aria-hidden="true"
				className="relative grid size-9 place-items-center rounded-xl border border-line bg-surface font-display text-[15px] font-extrabold tracking-[-0.04em] text-ink transition-colors duration-300 group-hover:border-line-strong"
			>
				M
				<span
					aria-hidden="true"
					className="absolute bottom-[7px] end-[7px] size-[5px] rounded-full bg-accent"
				/>
			</span>
			{!compact ? (
				<span className="hidden flex-col leading-none min-[420px]:flex">
					<span className="text-[12.5px] font-bold tracking-[-0.015em] text-ink">
						{t.common.firstName}
					</span>
					<span className="mt-1.5 font-mono text-[8px] font-medium uppercase tracking-[0.14em] text-muted rtl:font-arabic rtl:tracking-normal">
						{t.common.role}
					</span>
				</span>
			) : null}
		</a>
	);
}
