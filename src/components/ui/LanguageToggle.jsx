"use client";

import { useTranslation } from "@/i18n";
import { cn } from "@/utils/cn";

const options = [
	{ value: "en", label: "EN", ariaLabel: "English" },
	{ value: "ar", label: "عربي", ariaLabel: "العربية" },
];

export default function LanguageToggle({ className }) {
	const { language, setLanguage, t } = useTranslation();

	return (
		<div
			dir="ltr"
			role="group"
			aria-label={t.common.switchLanguage}
			className={cn(
				"inline-flex items-center rounded-full border border-line bg-surface/60 p-0.5",
				className,
			)}
		>
			{options.map((option) => {
				const active = language === option.value;

				return (
					<button
						key={option.value}
						type="button"
						onClick={() => setLanguage(option.value)}
						aria-pressed={active}
						aria-label={`${option.label} — ${option.ariaLabel}`}
						lang={option.value}
						className={cn(
							"rounded-full px-2.5 py-2 text-[10px] font-bold leading-none transition-colors duration-300 min-h-11 sm:min-h-8",
							option.value === "ar" && "font-arabic text-[11px]",
							active
								? "bg-ink text-canvas"
								: "text-muted hover:text-ink",
						)}
					>
						{option.label}
					</button>
				);
			})}
		</div>
	);
}
