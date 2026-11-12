import TechIcon from "./TechIcon";

export default function TechChip({ tech }) {
	return (
		<span className="group/tech inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[11px] font-medium text-muted transition-colors duration-300 hover:border-line-strong hover:text-ink">
			<TechIcon
				tech={tech}
				className="size-3.5 text-muted transition-colors duration-300 group-hover/tech:text-accent-text"
			/>
			<span>{tech.name}</span>
		</span>
	);
}
