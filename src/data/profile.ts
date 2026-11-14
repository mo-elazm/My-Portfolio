import type { NavItem, Profile } from "@/types/content";

export const profile: Profile = {
	name: "Mohamed Abo-Elazm",
	nameAr: "محمد أبو العزم",
	firstName: "Mohamed",
	firstNameAr: "محمد",
	role: "Software Engineer",
	roleAr: "مهندس برمجيات",
	email: "mazmgoo@gmail.com",
	phone: "+201030632762",
	phoneDisplay: "+20 103 063 2762",
	github: "https://github.com/mo-elazm",
	linkedin: "https://www.linkedin.com/in/mohamed-abo-elazm-73681b324/",
	whatsappNumber: "201030632762",
	whatsappDisplay: "+20 103 063 2762",
	location: "Egypt",
	locationAr: "مصر",
};

export const navItems: NavItem[] = [
	{ id: "home", key: "home" },
	{ id: "about", key: "about" },
	{ id: "experience", key: "experience" },
	{ id: "skills", key: "skills" },
	{ id: "work", key: "work" },
	{ id: "certifications", key: "certifications" },
	{ id: "contact", key: "contact" },
];

export const sectionIds = navItems.map((item) => item.id);

export const getWhatsAppLink = (message = "") => {
	const base = `https://wa.me/${profile.whatsappNumber}`;
	return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export const whatsappLink = getWhatsAppLink(
	"Hi Mohamed, I found your portfolio and would like to talk about a role or project.",
);
