import { useTranslation } from "@/i18n";
import Button from "@/components/ui/Button";

export default function NotFoundPage() {
	const { t } = useTranslation();

	return (
		<section className="container-shell flex min-h-[80vh] flex-col items-center justify-center py-32 text-center">
			<p className="font-mono text-xs font-bold text-accent-text">({t.notFound.eyebrow})</p>
			<h1 className="mt-5 max-w-2xl font-display text-5xl font-semibold tracking-[-0.05em] text-balance text-ink sm:text-7xl">
				{t.notFound.title}
			</h1>
			<p className="mt-5 max-w-md text-base leading-7 text-muted">
				{t.notFound.description}
			</p>
			<Button href="/" className="mt-8">
				{t.notFound.action}
			</Button>
		</section>
	);
}
