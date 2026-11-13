"use client";

import { useTranslation } from "@/i18n";
import Button from "@/components/ui/Button";

export default function NotFound() {
	const { t } = useTranslation();

	return (
		<section className="container-shell flex min-h-[80vh] flex-col items-center justify-center py-32 text-center">
			<p className="eyebrow-label">{t.notFound.eyebrow}</p>
			<h1 className="mt-5 max-w-2xl font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.045em] text-balance text-ink rtl:leading-[1.2] rtl:tracking-[-0.015em]">
				{t.notFound.title}
			</h1>
			<p className="mt-5 max-w-md text-pretty text-base leading-7 text-muted">
				{t.notFound.description}
			</p>
			<Button href="/" className="mt-8">
				{t.notFound.action}
			</Button>
		</section>
	);
}
