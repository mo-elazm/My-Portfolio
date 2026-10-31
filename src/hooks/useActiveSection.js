import { useEffect } from "react";
import { sectionIds } from "@/data/profile";
import useAppStore from "@/store/useAppStore";

export default function useActiveSection() {
	const setActiveSection = useAppStore((state) => state.setActiveSection);

	useEffect(() => {
		const sections = sectionIds
			.map((id) => document.getElementById(id))
			.filter(Boolean);

		if (!sections.length) {
			return undefined;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);

				if (visible[0]?.target?.id) {
					setActiveSection(visible[0].target.id);
				}
			},
			{
				rootMargin: "-28% 0px -58% 0px",
				threshold: [0, 0.2, 0.45, 0.7],
			},
		);

		sections.forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	}, [setActiveSection]);
}
