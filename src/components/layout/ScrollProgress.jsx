import { useEffect, useRef } from "react";

export default function ScrollProgress() {
	const barRef = useRef(null);

	useEffect(() => {
		let frame = 0;

		const update = () => {
			frame = 0;
			const scrollable = document.documentElement.scrollHeight - window.innerHeight;
			const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
			if (barRef.current) {
				barRef.current.style.transform = `scaleX(${progress})`;
			}
		};

		const onScroll = () => {
			if (!frame) {
				frame = window.requestAnimationFrame(update);
			}
		};

		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			if (frame) {
				window.cancelAnimationFrame(frame);
			}
		};
	}, []);

	return (
		<div className="fixed inset-x-0 top-0 z-[70] h-[2px] bg-transparent" aria-hidden="true">
			<div
				ref={barRef}
				className="h-full w-full origin-left bg-accent"
				style={{ transform: "scaleX(0)" }}
			/>
		</div>
	);
}
