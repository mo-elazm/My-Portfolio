import type { IconType } from "react-icons";

export type ProjectId = "foundit" | "coursewave" | "storeapi";
export type ProjectKind = "mobile" | "web" | "backend";
export type StackId = "frontend" | "backend" | "mobile" | "workflow";
export type TimelineId = "eraasoft" | "ibm";
export type TimelineIcon = "mentor" | "mobile";
export type CertificationId = "ibm" | "eraasoft";
export type CertificationIcon = "flutter" | "code";

export interface Profile {
	name: string;
	nameAr: string;
	firstName: string;
	firstNameAr: string;
	role: string;
	roleAr: string;
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

export interface CaseStudy {
	id: ProjectId;
	number: string;
	kind: ProjectKind;
	year: string;
	stack: string[];
	links: {
		repo: string;
		live?: string;
	};
}

export interface TechItem {
	name: string;
	icon?: IconType;
	mark?: string;
}

export interface StackCategory {
	id: StackId;
	icon: IconType;
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
