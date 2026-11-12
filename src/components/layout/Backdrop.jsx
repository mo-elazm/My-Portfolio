export default function Backdrop() {
	return (
		<div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
			<div className="dot-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black,transparent)]" />
			<div className="absolute -top-56 start-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[150px] rtl:translate-x-1/2" />
			<div className="absolute end-[-12rem] top-1/3 size-[26rem] rounded-full bg-accent/[0.05] blur-[130px]" />
		</div>
	);
}
