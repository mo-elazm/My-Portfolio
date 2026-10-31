export const profile = {
	name: "Mohamed Abo El-azm",
	nameAr: "محمد أبو العزم",
	portrait: "/mohamed-portrait.webp",
	avatar: "/mohamed-portrait.webp",
	email: "mazmgoo@gmail.com",
	github: "https://github.com/mo-elazm",
	linkedin: "https://www.linkedin.com/in/mohamed-abo-elazm-73681b324/",
	whatsappNumber: "201030632762",
	whatsappDisplay: "+20 103 063 2762",
};

export const navItems = [
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
	"Hi Mohamed, I found your portfolio and would like to talk about a project.",
);
