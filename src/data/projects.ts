import type { Project } from "@/types/content";

export const projects: Project[] = [
	{
		id: "mercato",
		number: "01",
		variant: "commerce",
		filter: "commerce",
		url: "https://e-commers-sooty.vercel.app",
		repo: "https://github.com/mo-elazm/E-commers",
		stack: ["React", "JavaScript", "CSS"],
	},
	{
		id: "skillline",
		number: "02",
		variant: "learning",
		filter: "web",
		url: "https://online-courses-iota-rust.vercel.app",
		repo: "https://github.com/mo-elazm/Online-Courses",
		stack: ["React", "Vite", "Responsive UI"],
	},
	{
		id: "walletly",
		number: "03",
		variant: "wallet",
		filter: "web",
		url: "https://react-project-eosin-five.vercel.app",
		repo: "https://github.com/mo-elazm/ReactProject",
		stack: ["React", "Interface Design", "State"],
	},
];

export const projectFilters = ["all", "web", "commerce"] as const;
