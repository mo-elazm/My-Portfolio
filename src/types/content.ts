import type { IconType } from "react-icons";

export type ProjectId = "mercato" | "skillline" | "walletly";
export type ProjectVariant = "commerce" | "learning" | "wallet";
export type ProjectFilter = "all" | "web" | "commerce";
export type StackId = "frontend" | "state" | "backend" | "data" | "exploring";
export type TimelineId = "eraasoft" | "internships";
export type TimelineIcon = "mentor" | "intern";
export type CertificationId = "ibm" | "eraasoft";
export type CertificationIcon = "flutter" | "code";

export interface Profile {
	name: string;
	nameAr: string;
	firstName: string;
	firstNameAr: string;
	role: string;
	roleAr: string;
	portrait: string;
	email: string;
	phone: string;
	phoneDisplay: string;
	github: string;
	linkedin: string;
	whatsappNumber: string;
	whatsappDisplay: string;
	location: string;
	locationAr: string;
}

export interface NavItem {
	id: string;
	key: "home" | "about" | "experience" | "skills" | "work" | "certifications" | "contact";
}

export interface Project {
	id: ProjectId;
	number: string;
	variant: ProjectVariant;
	filter: Exclude<ProjectFilter, "all">;
	url: string;
	repo: string;
	stack: string[];
}

export interface TechItem {
	name: string;
	nameAr?: string;
	icon?: IconType;
	mark?: string;
}

export interface StackCategory {
	id: StackId;
	icon: IconType;
	span: string;
	techs: TechItem[];
}

export interface TimelineEntry {
	id: TimelineId;
	icon: TimelineIcon;
	current: boolean;
}

export interface Certification {
	id: CertificationId;
	icon: CertificationIcon;
	grade: string | null;
	accent: string;
	image: string;
	width: number;
	height: number;
}
