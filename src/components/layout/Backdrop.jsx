export default function Backdrop() {
	return (
		<div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
			<div className="animate-aurora-a absolute -top-[22rem] -start-[14rem] size-[46rem] rounded-full bg-accent/[0.13] blur-[150px]" />
			<div className="animate-aurora-b absolute -top-[10rem] end-[-16rem] size-[40rem] rounded-full bg-secondary/[0.11] blur-[150px]" />
			<div className="animate-aurora-a absolute bottom-[-18rem] start-1/3 size-[38rem] rounded-full bg-peach/[0.08] blur-[150px] [animation-delay:-8s]" />

			<div className="visual-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]" />
			<div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
			<div className="noise-overlay absolute inset-0" />
		</div>
	);
}
