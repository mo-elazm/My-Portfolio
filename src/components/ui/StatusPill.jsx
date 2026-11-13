"use client";

import { useTranslation } from "@/i18n";
import { cn } from "@/utils/cn";

export default function StatusPill({ label, className }) {
	const { t } = useTranslation();

	return (
		<span
			className={cn(
				"inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[11px] font-semibold leading-none text-muted",
				className,
			)}
		>
			<span className="relative flex size-1.5 shrink-0" aria-hidden="true">
				<span className="absolute inline-flex size-full animate-pulse-soft rounded-full bg-accent" />
				<span className="relative inline-flex size-1.5 rounded-full bg-accent" />
			</span>
			<span>{label || t.common.available}</span>
		</span>
	);
}
