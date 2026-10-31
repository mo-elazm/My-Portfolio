import { useTranslation } from "@/i18n";
import { cn } from "@/utils/cn";

export default function StatusPill({ label, className, light = false }) {
	const { t } = useTranslation();

	return (
		<span
			className={cn(
				"inline-flex items-center gap-2.5 rounded-full border px-3.5 py-2 text-[10px] font-bold uppercase leading-none tracking-[0.16em]",
				light
					? "border-white/15 bg-white/[0.06] text-white/80 backdrop-blur-md"
					: "glass-chip text-muted",
				className,
			)}
		>
			<span className="relative flex size-2 shrink-0" aria-hidden="true">
				<span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-50" />
				<span className="relative inline-flex size-2 rounded-full bg-accent" />
			</span>
			<span>{label || t.common.available}</span>
		</span>
	);
}
