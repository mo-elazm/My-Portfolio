import {
	SiBootstrap,
	SiCss,
	SiDart,
	SiFirebase,
	SiFlutter,
	SiHtml5,
	SiJavascript,
	SiLaravel,
	SiMysql,
	SiNextdotjs,
	SiNodedotjs,
	SiPhp,
	SiPython,
	SiReact,
	SiStrapi,
	SiSupabase,
	SiTailwindcss,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbArrowsExchange, TbCompass, TbDatabase, TbLayoutGrid, TbNetwork, TbServer2 } from "react-icons/tb";

export const skillGroups = [
	{
		id: "frontend",
		icon: TbLayoutGrid,
		span: "lg:col-span-7",
		techs: [
			{ name: "HTML5", icon: SiHtml5 },
			{ name: "CSS3", icon: SiCss },
			{ name: "JavaScript", icon: SiJavascript },
			{ name: "React", icon: SiReact },
			{ name: "Next.js", icon: SiNextdotjs },
			{ name: "Bootstrap", icon: SiBootstrap },
			{ name: "Tailwind CSS", icon: SiTailwindcss },
		],
	},
	{
		id: "state",
		icon: TbArrowsExchange,
		span: "lg:col-span-5",
		techs: [{ name: "Zustand", mark: "Z" }],
	},
	{
		id: "backend",
		icon: TbServer2,
		span: "lg:col-span-5",
		techs: [
			{ name: "PHP", icon: SiPhp },
			{ name: "Laravel", icon: SiLaravel },
			{ name: "Node.js", icon: SiNodedotjs },
		],
	},
	{
		id: "data",
		icon: TbDatabase,
		span: "lg:col-span-7",
		techs: [
			{ name: "Supabase", icon: SiSupabase },
			{ name: "Firebase", icon: SiFirebase },
			{ name: "Strapi", icon: SiStrapi },
			{ name: "SQL", icon: SiMysql },
		],
	},
	{
		id: "exploring",
		icon: TbCompass,
		span: "lg:col-span-12",
		techs: [
			{ name: "Python", icon: SiPython },
			{ name: "Dart", icon: SiDart },
			{ name: "Flutter", icon: SiFlutter },
			{ name: "Java", icon: FaJava },
			{ name: "Networking", icon: TbNetwork },
		],
	},
];

export const featuredTech = ["React", "Next.js", "Zustand", "Laravel", "Node.js", "Supabase"];
