import { useTranslation } from "@/i18n";
import { cn } from "@/utils/cn";

export default function LanguageToggle({ className }) {
	const { language, setLanguage, t } = useTranslation();

	return (
		<div
			dir="ltr"
			role="group"
			aria-label={t.common.switchLanguage}
			className={cn(
				"inline-flex items-center rounded-full border border-line bg-surface/70 p-1",
				className,
			)}
		>
			<button
				type="button"
				onClick={() => setLanguage("en")}
				aria-pressed={language === "en"}
				aria-label="English"
				className={cn(
					"rounded-full px-2.5 py-1.5 text-[10px] font-extrabold tracking-[0.08em] transition-colors duration-300",
					language === "en"
						? "bg-ink text-canvas"
						: "text-muted hover:text-ink",
				)}
			>
				EN
			</button>
			<button
				type="button"
				onClick={() => setLanguage("ar")}
				aria-pressed={language === "ar"}
				aria-label="العربية"
				lang="ar"
				className={cn(
					"rounded-full px-2.5 py-1.5 font-arabic text-[11px] font-bold transition-colors duration-300",
					language === "ar"
						? "bg-ink text-canvas"
						: "text-muted hover:text-ink",
				)}
			>
				ع
			</button>
		</div>
	);
}
