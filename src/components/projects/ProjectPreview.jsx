import {
	FiArrowUpRight,
	FiCreditCard,
	FiMoreHorizontal,
	FiPlay,
	FiPlus,
	FiSearch,
	FiSend,
	FiSmartphone,
	FiTrendingUp,
} from "react-icons/fi";

const urls = {
	commerce: "mercato.vercel.app",
	learning: "skillline.vercel.app",
	wallet: "walletly.app",
};

function BrowserChrome({ variant }) {
	return (
		<div className="flex h-8 shrink-0 items-center gap-2 border-b border-black/5 bg-[#f4f4f5] px-3">
			<div className="flex items-center gap-1">
				<span className="size-1.5 rounded-full bg-zinc-300" />
				<span className="size-1.5 rounded-full bg-zinc-300" />
				<span className="size-1.5 rounded-full bg-zinc-300" />
			</div>
			<div className="mx-auto flex min-w-0 items-center rounded-full border border-black/5 bg-white px-3 py-0.5">
				<span className="truncate font-mono text-[7px] font-medium text-zinc-500">
					{urls[variant]}
				</span>
			</div>
			<FiMoreHorizontal className="size-3.5 text-zinc-400" />
		</div>
	);
}

function CommercePreview() {
	return (
		<div className="relative h-full overflow-hidden bg-[#f4f4f5] p-4 text-zinc-900 sm:p-5">
			<header className="flex items-center justify-between gap-3">
				<p className="font-display text-sm font-extrabold tracking-[-0.05em] sm:text-base">
					MERCATO<span className="text-indigo-600">.</span>
				</p>
				<div className="hidden items-center gap-4 text-[7px] font-semibold uppercase tracking-[0.12em] text-zinc-500 sm:flex">
					<span>Shop</span>
					<span>Collections</span>
					<span>Journal</span>
				</div>
				<span className="rounded-full bg-zinc-900 px-2.5 py-1 text-[7px] font-semibold text-white">
					Cart (2)
				</span>
			</header>

			<div className="mt-4 grid grid-cols-[1.05fr_0.95fr] gap-2.5">
				<div className="flex flex-col justify-between rounded-xl bg-indigo-50 p-4 ring-1 ring-indigo-100">
					<div>
						<p className="font-mono text-[6px] font-bold uppercase tracking-[0.18em] text-indigo-600">
							New season / 26
						</p>
						<h3 className="mt-2 font-display text-[clamp(1.05rem,3vw,1.8rem)] font-bold leading-[0.98] tracking-[-0.05em]">
							Essentials,
							<br />
							reimagined.
						</h3>
					</div>
					<span className="mt-5 inline-flex w-fit items-center gap-1 rounded-full bg-indigo-600 px-3 py-1.5 text-[7px] font-semibold text-white">
						Explore the drop
						<FiArrowUpRight className="size-2.5" />
					</span>
				</div>

				<div className="relative overflow-hidden rounded-xl bg-zinc-900 p-4 text-white">
					<div className="absolute -right-7 -top-8 size-24 rounded-full border border-white/10" />
					<div className="absolute -right-2 -top-2 size-12 rounded-full bg-indigo-500/30 blur-lg" />
					<div className="relative flex items-start justify-between">
						<div>
							<p className="font-mono text-[6px] uppercase tracking-[0.16em] text-white/40">
								Aura / 01
							</p>
							<p className="mt-1 text-[8px] font-semibold">The daily bottle</p>
						</div>
						<span className="text-[7px] text-white/50">$48</span>
					</div>
					<div className="absolute bottom-3 left-1/2 h-[48%] w-[23%] -translate-x-1/2 rounded-t-[999px] rounded-b-[20%] bg-gradient-to-b from-indigo-300 via-indigo-400 to-indigo-700 shadow-[0_12px_26px_-8px_rgba(99,102,241,0.55)]" />
					<div className="absolute bottom-[calc(48%+0.5rem)] left-1/2 h-[9%] w-[11%] -translate-x-1/2 rounded-sm bg-white/90" />
					<div className="absolute inset-x-4 bottom-3 flex items-center justify-between">
						<div className="flex gap-1">
							<span className="size-1.5 rounded-full bg-indigo-400" />
							<span className="size-1.5 rounded-full bg-white/30" />
							<span className="size-1.5 rounded-full bg-zinc-400" />
						</div>
						<span className="grid size-5 place-items-center rounded-full bg-white text-zinc-900">
							<FiPlus className="size-2.5" />
						</span>
					</div>
				</div>
			</div>

			<div className="mt-2.5 grid grid-cols-3 gap-2">
				{[
					{ name: "Linen tote", price: "$36", color: "bg-zinc-200" },
					{ name: "Orbit lamp", price: "$92", color: "bg-indigo-200" },
					{ name: "Clay cup", price: "$24", color: "bg-zinc-300" },
				].map((product) => (
					<div key={product.name} className="rounded-lg border border-zinc-200 bg-white p-2">
						<div className={`h-8 rounded-md ${product.color}`}>
							<div className="mx-auto h-full w-1/3 rounded-t-full bg-white/40" />
						</div>
						<div className="mt-1.5 flex items-center justify-between gap-1">
							<span className="truncate text-[6px] font-semibold">{product.name}</span>
							<span className="text-[6px] text-zinc-500">{product.price}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function LearningPreview() {
	const courses = [
		{ title: "Modern React Patterns", tag: "Development", color: "from-indigo-500 to-indigo-800" },
		{ title: "Design Systems 101", tag: "Design", color: "from-zinc-600 to-zinc-900" },
		{ title: "Backend with Node", tag: "Engineering", color: "from-violet-500 to-violet-800" },
	];

	return (
		<div className="relative h-full overflow-hidden bg-[#f4f4f5] p-4 text-zinc-900 sm:p-5">
			<header className="flex items-center justify-between gap-3">
				<p className="font-display text-sm font-extrabold tracking-[-0.05em]">
					skill<span className="text-indigo-600">line</span>
					<span className="text-zinc-400">.</span>
				</p>
				<div className="hidden items-center gap-3 text-[7px] font-semibold text-zinc-500 sm:flex">
					<span>Courses</span>
					<span>Paths</span>
					<span>For teams</span>
				</div>
				<div className="flex items-center gap-1.5">
					<span className="grid size-5 place-items-center rounded-full border border-zinc-200 bg-white">
						<FiSearch className="size-2.5 text-zinc-500" />
					</span>
					<span className="rounded-full bg-zinc-900 px-2.5 py-1 text-[6px] font-semibold text-white">
						Join now
					</span>
				</div>
			</header>

			<div className="mt-5 flex items-end justify-between gap-4">
				<div>
					<p className="font-mono text-[6px] font-bold uppercase tracking-[0.18em] text-indigo-600">
						Learn at your pace
					</p>
					<h3 className="mt-2 max-w-[230px] font-display text-[clamp(1.2rem,3.5vw,2rem)] font-bold leading-[0.98] tracking-[-0.05em]">
						Skills that move you forward.
					</h3>
				</div>
				<div className="hidden max-w-[38%] items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-[6px] text-zinc-500 sm:flex">
					<FiSearch className="size-2.5" />
					Search 140+ courses
				</div>
			</div>

			<div className="mt-4 grid grid-cols-3 gap-2.5">
				{courses.map((course) => (
					<div
						key={course.title}
						className="overflow-hidden rounded-xl border border-zinc-200 bg-white p-1.5"
					>
						<div
							className={`relative flex h-[74px] items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br ${course.color} sm:h-[92px]`}
						>
							<div className="absolute -right-5 -top-5 size-16 rounded-full border border-white/15" />
							<div className="absolute -bottom-7 -left-4 size-16 rounded-full bg-white/10 blur-sm" />
							<span className="relative grid size-7 place-items-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-sm">
								<FiPlay className="ms-0.5 size-3" />
							</span>
							<span className="absolute start-2 top-2 rounded-full bg-black/25 px-1.5 py-0.5 text-[5px] font-semibold text-white/85">
								{course.tag}
							</span>
						</div>
						<p className="mt-2 px-0.5 text-[7px] font-bold leading-3">{course.title}</p>
						<div className="mt-1 flex items-center justify-between px-0.5 text-[5.5px] text-zinc-500">
							<span>12 lessons</span>
							<span className="font-semibold text-indigo-600">Free</span>
						</div>
					</div>
				))}
			</div>

			<div className="mt-3 flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2">
				<div className="flex items-center gap-1.5">
					<span className="size-3 rounded-full bg-indigo-100" />
					<span className="text-[6px] font-semibold text-zinc-500">New paths added weekly</span>
				</div>
				<FiArrowUpRight className="size-2.5 text-zinc-500" />
			</div>
		</div>
	);
}

function WalletPreview() {
	const transactions = [
		{ label: "Adobe Creative Cloud", date: "Today, 10:24", amount: "-$54.99", icon: FiCreditCard },
		{ label: "Transfer received", date: "Yesterday, 18:02", amount: "+$1,200.00", icon: FiArrowUpRight },
		{ label: "Mobile top-up", date: "Mon, 09:15", amount: "-$20.00", icon: FiSmartphone },
	];

	return (
		<div className="relative h-full overflow-hidden bg-[#111114] p-4 text-zinc-100 sm:p-5">
			<div className="absolute -end-20 -top-24 size-52 rounded-full bg-indigo-500/15 blur-[60px]" />
			<header className="relative flex items-center justify-between gap-3">
				<p className="font-display text-sm font-extrabold tracking-[-0.05em]">
					wallet<span className="text-indigo-400">ly</span>
				</p>
				<div className="hidden items-center gap-3 text-[7px] font-medium text-zinc-500 sm:flex">
					<span>Overview</span>
					<span>Cards</span>
					<span>Activity</span>
				</div>
				<div className="flex items-center gap-1.5">
					<span className="grid size-5 place-items-center rounded-full border border-white/10 bg-white/[0.05]">
						<FiSearch className="size-2.5 text-zinc-400" />
					</span>
					<span className="grid size-5 place-items-center rounded-full bg-indigo-500 text-white">
						<FiPlus className="size-2.5" />
					</span>
				</div>
			</header>

			<div className="relative mt-4 grid grid-cols-[1.25fr_0.75fr] gap-2.5">
				<div className="relative overflow-hidden rounded-xl bg-indigo-500 p-3.5 text-white">
					<div className="absolute -right-6 -top-8 size-24 rounded-full border border-white/15" />
					<div className="flex items-start justify-between">
						<div>
							<p className="font-mono text-[6px] font-bold uppercase tracking-[0.14em] text-indigo-100">
								Total balance
							</p>
							<p className="mt-1.5 font-display text-[clamp(1.1rem,3vw,1.65rem)] font-extrabold tracking-[-0.04em]">
								$12,480.50
							</p>
						</div>
						<span className="rounded-full bg-white px-2 py-1 text-[5.5px] font-semibold text-indigo-700">
							+8.4%
						</span>
					</div>

					<div className="mt-2 flex items-end justify-between">
						<svg viewBox="0 0 140 36" className="h-8 w-[62%] overflow-visible" aria-hidden="true">
							<path
								d="M2 30 C16 28, 18 18, 32 20 S50 29, 62 19 S78 8, 92 13 S112 22, 138 4"
								fill="none"
								stroke="rgba(255,255,255,0.9)"
								strokeWidth="1.7"
								strokeLinecap="round"
							/>
							<circle cx="138" cy="4" r="2.5" fill="#ffffff" />
						</svg>
						<div className="text-end">
							<p className="font-mono text-[5.5px] text-indigo-100">**** 4829</p>
							<p className="mt-0.5 text-[6px] font-semibold">VISA</p>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-1.5">
					{[
						{ label: "Send", icon: FiSend },
						{ label: "Cards", icon: FiCreditCard },
						{ label: "Top up", icon: FiPlus },
						{ label: "Trends", icon: FiTrendingUp },
					].map((action) => {
						const Icon = action.icon;

						return (
							<div
								key={action.label}
								className="flex flex-col justify-between rounded-lg border border-white/10 bg-white/[0.04] p-2"
							>
								<Icon className="size-3 text-indigo-400" />
								<span className="mt-2 text-[5.5px] font-medium text-zinc-400">
									{action.label}
								</span>
							</div>
						);
					})}
				</div>
			</div>

			<div className="relative mt-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-3">
				<div className="flex items-center justify-between">
					<p className="text-[7px] font-semibold text-zinc-200">Recent activity</p>
					<p className="text-[5.5px] text-zinc-500">View all</p>
				</div>
				<div className="mt-2 divide-y divide-white/[0.06]">
					{transactions.map((transaction) => {
						const Icon = transaction.icon;

						return (
							<div key={transaction.label} className="flex items-center gap-2 py-1.5">
								<span className="grid size-5 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-zinc-400">
									<Icon className="size-2.5" />
								</span>
								<div className="min-w-0 flex-1">
									<p className="truncate text-[6.5px] font-medium text-zinc-300">
										{transaction.label}
									</p>
									<p className="text-[5px] text-zinc-500">{transaction.date}</p>
								</div>
								<span
									className={`text-[6px] font-semibold ${
										transaction.amount.startsWith("+") ? "text-indigo-400" : "text-zinc-400"
									}`}
								>
									{transaction.amount}
								</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default function ProjectPreview({ variant }) {
	return (
		<div
			aria-hidden="true"
			className="relative h-full w-full overflow-hidden rounded-[1.2rem] border border-line bg-surface"
		>
			<div className="flex h-full flex-col">
				<BrowserChrome variant={variant} />
				<div className="relative min-h-0 flex-1 overflow-hidden">
					{variant === "commerce" ? <CommercePreview /> : null}
					{variant === "learning" ? <LearningPreview /> : null}
					{variant === "wallet" ? <WalletPreview /> : null}
				</div>
			</div>
		</div>
	);
}
