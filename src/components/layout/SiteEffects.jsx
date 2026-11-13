"use client";

import useActiveSection from "@/hooks/useActiveSection";
import useScrollToTop from "@/hooks/useScrollToTop";
import useSectionReveal from "@/hooks/useSectionReveal";

export default function SiteEffects() {
	useScrollToTop();
	useActiveSection();
	useSectionReveal();

	return null;
}
