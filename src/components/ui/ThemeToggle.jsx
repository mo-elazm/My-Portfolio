import { FiMoon, FiSun } from "react-icons/fi";
import { useTranslation } from "@/i18n";
import useAppStore from "@/store/useAppStore";

export default function ThemeToggle({ className = "" }) {
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
			className={`relative inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface/70 text-ink transition-colors duration-300 hover:border-accent-text/50 hover:text-accent-text ${className}`}
		>
			<span className="relative size-[18px]">
				<FiSun
					aria-hidden="true"
					className={`absolute inset-0 size-[18px] transition-all duration-300 ${
						isDark ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
					}`}
				/>
				<FiMoon
					aria-hidden="true"
					className={`absolute inset-0 size-[18px] transition-all duration-300 ${
						isDark ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
					}`}
				/>
			</span>
		</button>
	);
}
