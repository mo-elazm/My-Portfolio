import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { IBM_Plex_Sans_Arabic, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import PreferencesProvider from "@/providers/PreferencesProvider";
import Backdrop from "@/components/layout/Backdrop";
import Footer from "@/components/layout/Footer";
import MobileMenu from "@/components/layout/MobileMenu";
import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import SiteEffects from "@/components/layout/SiteEffects";
import CertificateLightbox from "@/components/ui/CertificateLightbox";
import { translations } from "@/i18n/translations";
import { profile } from "@/data/profile";
import { siteName, siteUrl } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
	variable: "--font-jakarta",
	display: "swap",
});

const jetbrains = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	variable: "--font-jetbrains",
	display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
	subsets: ["arabic", "latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-plex-arabic",
	display: "swap",
});

type Preferences = {
	theme: "dark" | "light";
	language: "en" | "ar";
};

const readPreferences = async (): Promise<Preferences> => {
	const store = await cookies();

	return {
		theme: store.get("mo-theme")?.value === "light" ? "light" : "dark",
		language: store.get("mo-lang")?.value === "ar" ? "ar" : "en",
	};
};

export async function generateMetadata(): Promise<Metadata> {
	const { language } = await readPreferences();
	const content = translations[language];
	const isArabic = language === "ar";

	return {
		metadataBase: new URL(siteUrl),
		title: content.meta.title,
		description: content.meta.description,
		applicationName: `${siteName} — Portfolio`,
		authors: [{ name: profile.name, url: profile.github }],
		creator: profile.name,
		publisher: profile.name,
		keywords: [
			"Mohamed Abo El-azm",
			"Front-End Developer",
			"React Developer",
			"Next.js Developer",
			"Tailwind CSS",
			"TypeScript",
			"GSAP",
			"Portfolio",
			"Egypt",
		],
		alternates: {
			canonical: "/",
			languages: {
				"en-US": "/",
				"ar-EG": "/",
			},
		},
		icons: {
			icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
			shortcut: "/favicon.svg",
		},
		openGraph: {
			type: "website",
			url: "/",
			siteName,
			title: content.meta.title,
			description: content.meta.description,
			locale: isArabic ? "ar_EG" : "en_US",
			alternateLocale: isArabic ? ["en_US"] : ["ar_EG"],
			images: [
				{
					url: "/opengraph-image",
					width: 1200,
					height: 630,
					alt: content.meta.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: content.meta.title,
			description: content.meta.description,
			images: ["/opengraph-image"],
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
	};
}

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: [
		{ media: "(prefers-color-scheme: dark)", color: "#09090B" },
		{ media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
	],
	colorScheme: "dark light",
};

const personSchema = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: profile.name,
	alternateName: profile.nameAr,
	jobTitle: "Front-End Developer",
	email: `mailto:${profile.email}`,
	url: siteUrl,
	image: `${siteUrl}${profile.portrait}`,
	sameAs: [profile.github, profile.linkedin],
	knowsAbout: [
		"React",
		"Next.js",
		"JavaScript",
		"Tailwind CSS",
		"Zustand",
		"GSAP",
		"Laravel",
		"Node.js",
		"PHP",
		"Flutter",
		"Supabase",
		"Firebase",
		"SQL",
	],
	hasCredential: [
		{
			"@type": "EducationalOccupationalCredential",
			name: "Advanced Flutter Internship",
			description:
				"Four-week advanced Flutter internship completed in November 2025 with an A+ grade.",
			credentialCategory: "Certificate",
			recognizedBy: { "@type": "Organization", name: "IBM" },
		},
		{
			"@type": "EducationalOccupationalCredential",
			name: "Front-End Diploma",
			description:
				"Front-End Diploma certified by EraaSoft Academy, issued 25 July 2026.",
			credentialCategory: "Diploma",
			recognizedBy: { "@type": "Organization", name: "EraaSoft Academy" },
		},
	],
};

export default async function RootLayout({ children }: { children: ReactNode }) {
	const { theme, language } = await readPreferences();
	const isDark = theme === "dark";
	const isArabic = language === "ar";

	return (
		<html
			lang={language}
			dir={isArabic ? "rtl" : "ltr"}
			data-theme={theme}
			className={`${jakarta.variable} ${jetbrains.variable} ${plexArabic.variable}${
				isDark ? " dark" : ""
			}`}
			suppressHydrationWarning
		>
			<body>
				<PreferencesProvider initialTheme={theme} initialLanguage={language}>
					<a
						href="#main-content"
						className="fixed start-4 top-4 z-[80] -translate-y-20 rounded-full bg-accent-strong px-5 py-3 text-xs font-bold text-white transition-transform focus:translate-y-0"
					>
						{isArabic ? "تجاوز إلى المحتوى" : "Skip to content"}
					</a>

					<Backdrop />
					<ScrollProgress />
					<SiteEffects />
					<Navbar />
					<MobileMenu />
					<CertificateLightbox />

					<main id="main-content" className="relative z-10">
						{children}
					</main>

					<Footer />
				</PreferencesProvider>

				<noscript>
					<style>{`[data-reveal],[data-reveal-item],.hero-anim,.hero-fade{opacity:1!important}.hero-line{transform:none!important}`}</style>
				</noscript>

				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
				/>
			</body>
		</html>
	);
}
