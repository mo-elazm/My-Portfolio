import { useEffect } from "react";

export default function useScrollToTop() {
	useEffect(() => {
		if ("scrollRestoration" in window.history) {
			window.history.scrollRestoration = "manual";
		}

		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		window.scrollTo({
			top: 0,
			left: 0,
			behavior: reduceMotion ? "auto" : "smooth",
		});
	}, []);
}
