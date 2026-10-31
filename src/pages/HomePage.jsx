import About from "@/sections/About";
import Certifications from "@/sections/Certifications";
import Contact from "@/sections/Contact";
import Experience from "@/sections/Experience";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import Marquee from "@/components/ui/Marquee";
import { useTranslation } from "@/i18n";

export default function HomePage() {
	const { t } = useTranslation();

	return (
		<>
			<Hero />
			<Marquee items={t.marquee} />
			<About />
			<Experience />
			<Skills />
			<Projects />
			<Certifications />
			<Contact />
		</>
	);
}
