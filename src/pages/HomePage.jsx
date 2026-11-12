import About from "@/sections/About";
import Certifications from "@/sections/Certifications";
import Contact from "@/sections/Contact";
import Experience from "@/sections/Experience";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";

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
