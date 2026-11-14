import {
	SiDart,
	SiExpress,
	SiFlutter,
	SiGit,
	SiGreensock,
	SiJavascript,
	SiJsonwebtokens,
	SiMongodb,
	SiNextdotjs,
	SiNodedotjs,
	SiReact,
	SiSupabase,
	SiTailwindcss,
	SiTypescript,
	SiVercel,
} from "react-icons/si";
import {
	TbApi,
	TbChecklist,
	TbGitPullRequest,
	TbLayoutGrid,
	TbServer2,
	TbStack2,
	TbUsersGroup,
} from "react-icons/tb";
import type { StackCategory } from "@/types/content";

export const stackCategories: StackCategory[] = [
	{
		id: "frontend",
		icon: TbLayoutGrid,
		techs: [
			{ name: "Next.js (App Router)", icon: SiNextdotjs },
			{ name: "React", icon: SiReact },
			{ name: "TypeScript", icon: SiTypescript },
			{ name: "JavaScript (ES6+)", icon: SiJavascript },
			{ name: "Tailwind CSS", icon: SiTailwindcss },
			{ name: "Zustand", mark: "Z" },
			{ name: "GSAP", icon: SiGreensock },
		],
	},
	{
		id: "backend",
		icon: TbServer2,
		techs: [
			{ name: "Node.js", icon: SiNodedotjs },
			{ name: "Express", icon: SiExpress },
			{ name: "Supabase (PostgreSQL & RPC)", icon: SiSupabase },
			{ name: "MongoDB", icon: SiMongodb },
			{ name: "Mongoose", mark: "M" },
			{ name: "RESTful APIs", icon: TbApi },
			{ name: "JWT Auth", icon: SiJsonwebtokens },
		],
	},
	{
		id: "mobile",
		icon: SiFlutter,
		techs: [
			{ name: "Flutter", icon: SiFlutter },
			{ name: "Dart", icon: SiDart },
			{ name: "Cubit / BLoC", icon: TbStack2 },
		],
	},
	{
		id: "workflow",
		icon: TbGitPullRequest,
		techs: [
			{ name: "Git & GitHub (PR Reviews)", icon: SiGit },
			{ name: "Automated Testing", icon: TbChecklist },
			{ name: "Vercel Deployment", icon: SiVercel },
			{ name: "Agile Collaboration", icon: TbUsersGroup },
		],
	},
];

export const featuredTech = [
	"Next.js",
	"TypeScript",
	"Node.js",
	"Supabase",
	"MongoDB",
	"Flutter",
];
