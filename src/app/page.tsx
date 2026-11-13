import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Experience from "@/sections/Experience";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Certifications from "@/sections/Certifications";
import Contact from "@/sections/Contact";

export default function HomePage() {
	return (
		<>
			<Hero />
			<About />
			<Experience />
			<Skills />
			<Projects />
			<Certifications />
			<Contact />
		</>
	);
}
