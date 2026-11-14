"use client";

import { FaWhatsapp } from "react-icons/fa6";
import { FiGithub, FiMail } from "react-icons/fi";
import { getWhatsAppLink, profile } from "@/data/profile";
import { useTranslation } from "@/i18n";
import { cn } from "@/utils/cn";

export default function SocialLinks({ className, iconClassName }) {
	const { t } = useTranslation();

	const socials = [
		{ name: "GitHub", href: profile.github, icon: FiGithub },
		{
			name: "WhatsApp",
			href: getWhatsAppLink("Hi Mohamed, I found your portfolio."),
			icon: FaWhatsapp,
		},
		{ name: t.common.email, href: `mailto:${profile.email}`, icon: FiMail, external: false },
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
						className={cn("icon-btn size-9", iconClassName)}
					>
						<Icon aria-hidden="true" className="size-[15px]" />
					</a>
				);
			})}
		</div>
	);
}
