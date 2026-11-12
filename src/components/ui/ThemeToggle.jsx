import { FiMoon, FiSun } from "react-icons/fi";
import { useTranslation } from "@/i18n";
import useAppStore from "@/store/useAppStore";
import { cn } from "@/utils/cn";

export default function ThemeToggle({ className }) {
	const { t } = useTranslation();
	const theme = useAppStore((state) => state.theme);
	const toggleTheme = useAppStore((state) => state.toggleTheme);
	const isDark = theme === "dark";

	return (
		<button
			type="button"
			onClick={toggleTheme}
			aria-label={t.common.toggleTheme}
			title={t.common.toggleTheme}
			className={cn("icon-btn size-9 shrink-0", className)}
		>
			<span className="relative size-[16px]">
				<FiSun
					aria-hidden="true"
					className={cn(
						"absolute inset-0 size-[16px] transition-all duration-500",
						isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0",
					)}
				/>
				<FiMoon
					aria-hidden="true"
					className={cn(
						"absolute inset-0 size-[16px] transition-all duration-500",
						isDark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100",
					)}
				/>
			</span>
		</button>
	);
}
