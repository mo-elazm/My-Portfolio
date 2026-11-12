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

	return (
		<footer className="relative z-10 border-t border-line">
			<div className="container-shell py-12 sm:py-14">
				<div className="grid gap-10 md:grid-cols-[1.4fr_0.7fr_0.9fr] md:gap-14">
					<div className="max-w-sm">
						<Logo />
						<p className="mt-5 text-sm leading-7 text-pretty text-muted">
							{t.footer.tagline}
						</p>
						<SocialLinks className="mt-5" />
					</div>

					<div>
						<p className="eyebrow-label">{t.footer.navigate}</p>
						<nav className="mt-4 flex flex-col items-start gap-2.5" aria-label={t.footer.navigate}>
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
						<div className="mt-4 flex flex-col items-start gap-2.5">
							<a
								href={`mailto:${profile.email}`}
								className="link-underline inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
							>
								<FiMail aria-hidden="true" className="size-3.5 text-accent-text" />
								<span dir="ltr">{profile.email}</span>
							</a>
							<a
								href={getWhatsAppLink("Hi Mohamed, I found your portfolio.")}
								target="_blank"
								rel="noreferrer noopener"
								className="link-underline inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
							>
								<FaWhatsapp aria-hidden="true" className="size-3.5 text-accent-text" />
								<span dir="ltr">{profile.whatsappDisplay}</span>
							</a>
							<a
								href={profile.github}
								target="_blank"
								rel="noreferrer noopener"
								className="link-underline inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
							>
								<FiGithub aria-hidden="true" className="size-3.5 text-accent-text" />
								<span>@mo-elazm</span>
							</a>
							<a
								href={profile.linkedin}
								target="_blank"
								rel="noreferrer noopener"
								className="link-underline inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
							>
								<FiLinkedin aria-hidden="true" className="size-3.5 text-accent-text" />
								<span>LinkedIn</span>
							</a>
						</div>
					</div>
				</div>

				<div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
					<p className="text-[11px] leading-5 text-muted">
						© {CURRENT_YEAR} {displayName}. {t.footer.rights}
					</p>

					<div className="flex items-center justify-between gap-5 sm:justify-end">
						<p className="text-[10px] text-muted/80">{t.footer.built}</p>
						<a
							href="#home"
							aria-label={t.common.backToTop}
							title={t.common.backToTop}
							className="icon-btn group size-9 shrink-0"
						>
							<FiArrowUp
								aria-hidden="true"
								className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
							/>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
