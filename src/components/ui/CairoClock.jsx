"use client";

import { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";
import { useTranslation } from "@/i18n";
import { cn } from "@/utils/cn";

const formatter = new Intl.DateTimeFormat("en-GB", {
	timeZone: "Africa/Cairo",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	hour12: false,
});

export default function CairoClock({ className, icon = true }) {
	const { t } = useTranslation();
	const [time, setTime] = useState(null);

	useEffect(() => {
		const update = () => setTime(formatter.format(new Date()));

		update();
		const interval = window.setInterval(update, 1000);

		return () => window.clearInterval(interval);
	}, []);

	return (
		<span
			className={cn(
				"inline-flex min-w-0 items-center gap-1.5 font-mono text-[10px] font-medium leading-none text-muted",
				className,
			)}
		>
			{icon ? (
				<FiClock aria-hidden="true" className="size-3 shrink-0 text-accent-text" />
			) : null}
			<span className="truncate">
				{t.common.cairo} • {t.common.timezone}
			</span>
			<span dir="ltr" className="tabular-nums tracking-normal">
				{time ?? "--:--:--"}
			</span>
		</span>
	);
}
