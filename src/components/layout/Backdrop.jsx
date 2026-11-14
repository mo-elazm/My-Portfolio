export default function Backdrop() {
	return (
		<div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
			<div className="ambient-mesh absolute inset-0" />
			<div className="dot-grid absolute inset-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black,transparent)] dark:opacity-[0.035]" />
			<div className="absolute left-1/2 -top-56 size-[42rem] -translate-x-1/2 rounded-full bg-indigo-600/[0.06] blur-[150px] dark:bg-indigo-500/[0.14]" />
			<div className="absolute end-[-12rem] top-1/3 size-[26rem] rounded-full bg-violet-500/[0.04] blur-[130px] dark:bg-violet-500/[0.09]" />
		</div>
	);
}
