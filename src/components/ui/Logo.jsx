import { useTranslation } from "@/i18n";
import { cn } from "@/utils/cn";

export default function Logo({ className, onClick, compact = false }) {
	const { t } = useTranslation();

	return (
		<a
			href="#home"
			onClick={onClick}
			aria-label={t.common.name}
			className={cn("group flex shrink-0 items-center gap-3", className)}
		>
			<span className="relative grid size-10 place-items-center rounded-[14px] bg-ink font-display text-[17px] font-bold tracking-[-0.08em] text-canvas transition-transform duration-300 group-hover:-rotate-6">
				M<span className="absolute bottom-[9px] end-[8px] size-[5px] rounded-full bg-accent" />
			</span>
			{!compact ? (
				<span className="hidden flex-col leading-none min-[420px]:flex">
					<span className="text-[13px] font-extrabold tracking-[-0.02em] text-ink">
						{t.common.firstName}
					</span>
					<span className="mt-1.5 text-[8px] font-bold uppercase tracking-[0.2em] text-muted">
						{t.common.role}
					</span>
				</span>
			) : null}
		</a>
	);
}
