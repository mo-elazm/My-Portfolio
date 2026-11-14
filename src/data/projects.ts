import { profile } from "@/data/profile";
import type { CaseStudy } from "@/types/content";

export const caseStudies: CaseStudy[] = [
	{
		id: "foundit",
		number: "01",
		kind: "mobile",
		year: "2025",
		stack: ["Flutter", "Dart", "Supabase", "Cubit", "PostgreSQL"],
		links: { repo: profile.github },
	},
	{
		id: "coursewave",
		number: "02",
		kind: "web",
		year: "2025",
		stack: ["React", "Zustand", "REST API", "Tailwind CSS"],
		links: { repo: profile.github },
	},
	{
		id: "storeapi",
		number: "03",
		kind: "backend",
		year: "2024",
		stack: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT"],
		links: { repo: profile.github },
	},
];
