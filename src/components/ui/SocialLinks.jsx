import { FaWhatsapp } from "react-icons/fa6";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { getWhatsAppLink, profile } from "@/data/profile";
import { useTranslation } from "@/i18n";
import { cn } from "@/utils/cn";

export default function SocialLinks({ className, iconClassName }) {
	const { t } = useTranslation();

	const socials = [
		{
			name: "GitHub",
			href: profile.github,
			icon: FiGithub,
		},
		{
			name: "LinkedIn",
			href: profile.linkedin,
			icon: FiLinkedin,
		},
		{
			name: "WhatsApp",
			href: getWhatsAppLink("Hi Mohamed, I found your portfolio."),
			icon: FaWhatsapp,
		},
		{
			name: t.common.email,
			href: `mailto:${profile.email}`,
			icon: FiMail,
			external: false,
		},
	];

	return (
		<div className={cn("flex items-center gap-2", className)}>
			{socials.map((social) => {
				const Icon = social.icon;
				const external = social.external !== false;
				return (
					<a
						key={social.name}
						href={social.href}
						target={external ? "_blank" : undefined}
						rel={external ? "noreferrer noopener" : undefined}
						aria-label={social.name}
						title={social.name}
						className={cn(
							"glass-chip group grid size-10 place-items-center rounded-full text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-text/50 hover:text-accent-text",
							iconClassName,
						)}
					>
						<Icon aria-hidden="true" className="size-[17px]" />
					</a>
				);
			})}
		</div>
	);
}
