import TechIcon from "./TechIcon";

export default function TechChip({ tech }) {
	return (
		<span className="group/tech inline-flex items-center gap-2 rounded-full border border-line bg-canvas/60 px-3 py-2 text-[11px] font-semibold text-muted transition-colors duration-300 hover:border-accent-text/35 hover:text-ink">
			<TechIcon
				tech={tech}
				className="size-4 text-muted transition-colors duration-300 group-hover/tech:text-accent-text"
			/>
			<span>{tech.name}</span>
		</span>
	);
}
