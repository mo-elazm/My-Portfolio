import { FaWhatsapp } from "react-icons/fa6";
import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { getWhatsAppLink, navItems, profile } from "@/data/profile";
import { useTranslation } from "@/i18n";
import Logo from "@/components/ui/Logo";
import SocialLinks from "@/components/ui/SocialLinks";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
	const { t, language } = useTranslation();
	const displayName = language === "ar" ? profile.nameAr : profile.name;
	const wordmark = language === "ar" ? "محمد" : "MOHAMED";

	return (
		<footer className="relative z-10 border-t border-line bg-canvas/80 backdrop-blur-xl">
			<div className="container-shell pb-7 pt-14 sm:pt-16">
				<div className="grid gap-10 md:grid-cols-[1.4fr_0.6fr_0.8fr] md:gap-14">
					<div className="max-w-sm">
						<Logo />
						<p className="mt-5 text-sm leading-7 text-muted text-pretty">
							{t.footer.tagline}
						</p>
						<SocialLinks className="mt-6" />
					</div>

					<div>
						<p className="eyebrow-label">{t.footer.navigate}</p>
						<nav className="mt-5 flex flex-col items-start gap-3" aria-label={t.footer.navigate}>
							{navItems.map((item) => (
								<a
									key={item.id}
									href={`#${item.id}`}
									className="link-underline text-sm font-medium text-muted transition-colors hover:text-ink"
								>
									{t.nav[item.key]}
								</a>
							))}
						</nav>
					</div>

					<div>
						<p className="eyebrow-label">{t.footer.connect}</p>
						<div className="mt-5 flex flex-col items-start gap-3">
							<a
								href={`mailto:${profile.email}`}
								className="link-underline inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
							>
								<FiMail aria-hidden="true" className="size-4 text-accent-text" />
								<span dir="ltr">{profile.email}</span>
							</a>
							<a
								href={getWhatsAppLink("Hi Mohamed, I found your portfolio.")}
								target="_blank"
								rel="noreferrer noopener"
								className="link-underline inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
							>
								<FaWhatsapp aria-hidden="true" className="size-4 text-accent-text" />
								<span dir="ltr">{profile.whatsappDisplay}</span>
							</a>
							<a
								href={profile.github}
								target="_blank"
								rel="noreferrer noopener"
								className="link-underline inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
							>
								<FiGithub aria-hidden="true" className="size-4 text-accent-text" />
								<span>@mo-elazm</span>
							</a>
							<a
								href={profile.linkedin}
								target="_blank"
								rel="noreferrer noopener"
								className="link-underline inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
							>
								<FiLinkedin aria-hidden="true" className="size-4 text-accent-text" />
								<span>LinkedIn</span>
							</a>
						</div>
					</div>
				</div>

				<div className="mt-12 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
					<p className="text-[11px] leading-5 text-muted">
						© {CURRENT_YEAR} {displayName}. {t.footer.rights}
					</p>

					<div className="flex items-center justify-between gap-5 sm:justify-end">
						<p className="text-[10px] text-muted/80">{t.footer.built}</p>
						<a
							href="#home"
							aria-label={t.common.backToTop}
							title={t.common.backToTop}
							className="group inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface/60 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-text/50 hover:text-accent-text"
						>
							<FiArrowUp
								aria-hidden="true"
								className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5"
							/>
						</a>
					</div>
				</div>

				<div className="mt-8 overflow-hidden select-none" aria-hidden="true">
					<p className="font-display text-[clamp(4.5rem,16vw,12.5rem)] font-bold leading-[0.72] tracking-[-0.085em] text-ink/[0.055] rtl:tracking-normal">
						{wordmark}
					</p>
				</div>
			</div>
		</footer>
	);
}
