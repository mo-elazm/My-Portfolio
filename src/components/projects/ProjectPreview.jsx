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
		<div className="flex h-9 shrink-0 items-center gap-2 border-b border-black/10 bg-[#f8f6ef] px-3">
			<div className="flex items-center gap-1.5">
				<span className="size-1.5 rounded-full bg-[#e67b6a]" />
				<span className="size-1.5 rounded-full bg-[#e5bd5d]" />
				<span className="size-1.5 rounded-full bg-[#7cb56f]" />
			</div>
			<div className="mx-auto flex min-w-0 items-center rounded-full border border-black/10 bg-white/70 px-4 py-1">
				<span className="truncate font-mono text-[7px] font-semibold text-[#5f695f]">
					{urls[variant]}
				</span>
			</div>
			<FiMoreHorizontal className="size-3.5 text-[#8b938b]" />
		</div>
	);
}

function CommercePreview() {
	return (
		<div className="relative h-full overflow-hidden bg-[#eee8db] p-4 text-[#161b16] sm:p-5">
			<header className="flex items-center justify-between gap-3">
				<p className="font-display text-sm font-bold tracking-[-0.06em] sm:text-base">
					MERCATO<span className="text-[#75a425]">.</span>
				</p>
				<div className="hidden items-center gap-4 text-[7px] font-semibold uppercase tracking-[0.15em] text-[#5f685f] sm:flex">
					<span>Shop</span>
					<span>Collections</span>
					<span>Journal</span>
				</div>
				<span className="rounded-full bg-[#151b15] px-2.5 py-1 text-[7px] font-semibold text-white">
					Cart (2)
				</span>
			</header>

			<div className="mt-4 grid grid-cols-[1.05fr_0.95fr] gap-2.5">
				<div className="flex flex-col justify-between rounded-xl bg-[#dce8cc] p-4">
					<div>
						<p className="font-mono text-[6px] font-bold uppercase tracking-[0.2em] text-[#677a51]">
							New season / 26
						</p>
						<h3 className="mt-2 font-display text-[clamp(1.05rem,3vw,1.8rem)] font-semibold leading-[0.95] tracking-[-0.06em]">
							Essentials,
							<br />
							reimagined.
						</h3>
					</div>
					<span className="mt-5 inline-flex w-fit items-center gap-1 rounded-full bg-[#171d17] px-3 py-1.5 text-[7px] font-semibold text-white">
						Explore the drop
						<FiArrowUpRight className="size-2.5" />
					</span>
				</div>

				<div className="relative overflow-hidden rounded-xl bg-[#1a211a] p-4 text-white">
					<div className="absolute -right-7 -top-8 size-24 rounded-full border border-white/10" />
					<div className="absolute -right-2 -top-2 size-12 rounded-full bg-[#c9ff5b]/20 blur-lg" />
					<div className="relative flex items-start justify-between">
						<div>
							<p className="font-mono text-[6px] uppercase tracking-[0.17em] text-white/40">Aura / 01</p>
							<p className="mt-1 text-[8px] font-semibold">The daily bottle</p>
						</div>
						<span className="text-[7px] text-white/50">$48</span>
					</div>
					<div className="absolute bottom-3 left-1/2 h-[48%] w-[23%] -translate-x-1/2 rounded-t-[999px] rounded-b-[20%] bg-gradient-to-b from-[#e3ff9c] via-[#bbe35c] to-[#729632] shadow-[0_12px_26px_-8px_rgba(201,255,91,0.4)]" />
					<div className="absolute bottom-[calc(48%+0.5rem)] left-1/2 h-[9%] w-[11%] -translate-x-1/2 rounded-sm bg-[#f4f7ec]" />
					<div className="absolute inset-x-4 bottom-3 flex items-center justify-between">
						<div className="flex gap-1">
							<span className="size-1.5 rounded-full bg-[#c9ff5b]" />
							<span className="size-1.5 rounded-full bg-white/30" />
							<span className="size-1.5 rounded-full bg-[#d5a474]" />
						</div>
						<span className="grid size-5 place-items-center rounded-full bg-white text-[#151b15]">
							<FiPlus className="size-2.5" />
						</span>
					</div>
				</div>
			</div>

			<div className="mt-2.5 grid grid-cols-3 gap-2">
				{[
					{ name: "Linen tote", price: "$36", color: "bg-[#cfbfa9]" },
					{ name: "Orbit lamp", price: "$92", color: "bg-[#a9b7a5]" },
					{ name: "Clay cup", price: "$24", color: "bg-[#d2a98d]" },
				].map((product) => (
					<div key={product.name} className="rounded-lg border border-[#d8d2c3] bg-[#f8f4eb] p-2">
						<div className={`h-8 rounded-md ${product.color}`}>
							<div className="mx-auto h-full w-1/3 rounded-t-full bg-white/25" />
						</div>
						<div className="mt-1.5 flex items-center justify-between gap-1">
							<span className="truncate text-[6px] font-semibold">{product.name}</span>
							<span className="text-[6px] text-[#697268]">{product.price}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function LearningPreview() {
	const courses = [
		{ title: "Modern React Patterns", tag: "Development", color: "from-[#1c2b23] to-[#4c775c]" },
		{ title: "Design Systems 101", tag: "Design", color: "from-[#9c6a46] to-[#d8aa72]" },
		{ title: "Backend with Node", tag: "Engineering", color: "from-[#25363f] to-[#55798c]" },
	];

	return (
		<div className="relative h-full overflow-hidden bg-[#e8efe9] p-4 text-[#111914] sm:p-5">
			<header className="flex items-center justify-between gap-3">
				<p className="font-display text-sm font-bold tracking-[-0.06em]">
					skill<span className="text-[#2c927f]">line</span>
					<span className="text-[#8ba396]">.</span>
				</p>
				<div className="hidden items-center gap-3 text-[7px] font-semibold text-[#61716a] sm:flex">
					<span>Courses</span>
					<span>Paths</span>
					<span>For teams</span>
				</div>
				<div className="flex items-center gap-1.5">
					<span className="grid size-5 place-items-center rounded-full border border-[#bac8c0] bg-white/60">
						<FiSearch className="size-2.5" />
					</span>
					<span className="rounded-full bg-[#152019] px-2.5 py-1 text-[6px] font-semibold text-white">
						Join now
					</span>
				</div>
			</header>

			<div className="mt-5 flex items-end justify-between gap-4">
				<div>
					<p className="font-mono text-[6px] font-bold uppercase tracking-[0.2em] text-[#6f8579]">
						Learn at your pace
					</p>
					<h3 className="mt-2 max-w-[230px] font-display text-[clamp(1.2rem,3.5vw,2rem)] font-semibold leading-[0.95] tracking-[-0.06em]">
						Skills that move you forward.
					</h3>
				</div>
				<div className="hidden max-w-[38%] items-center gap-2 rounded-full border border-[#c4d1c9] bg-white/65 px-3 py-2 text-[6px] text-[#74877c] sm:flex">
					<FiSearch className="size-2.5" />
					Search 140+ courses
				</div>
			</div>

			<div className="mt-4 grid grid-cols-3 gap-2.5">
				{courses.map((course) => (
					<div
						key={course.title}
						className="overflow-hidden rounded-xl border border-[#c5d1ca] bg-[#f7faf7] p-1.5"
					>
						<div
							className={`relative flex h-[74px] items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br ${course.color} sm:h-[92px]`}
						>
							<div className="absolute -right-5 -top-5 size-16 rounded-full border border-white/15" />
							<div className="absolute -bottom-7 -left-4 size-16 rounded-full bg-white/10 blur-sm" />
							<span className="relative grid size-7 place-items-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-sm">
								<FiPlay className="ms-0.5 size-3" />
							</span>
							<span className="absolute start-2 top-2 rounded-full bg-black/20 px-1.5 py-0.5 text-[5px] font-semibold text-white/80">
								{course.tag}
							</span>
						</div>
						<p className="mt-2 px-0.5 text-[7px] font-bold leading-3">{course.title}</p>
						<div className="mt-1 flex items-center justify-between px-0.5 text-[5.5px] text-[#73837a]">
							<span>12 lessons</span>
							<span className="font-semibold text-[#25372c]">Free</span>
						</div>
					</div>
				))}
			</div>

			<div className="mt-3 flex items-center justify-between rounded-lg border border-[#c8d4cc] bg-white/45 px-3 py-2">
				<div className="flex items-center gap-1.5">
					<span className="size-3 rounded-full bg-[#2c927f]/20" />
					<span className="text-[6px] font-semibold text-[#54675c]">New paths added weekly</span>
				</div>
				<FiArrowUpRight className="size-2.5 text-[#536b5d]" />
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
		<div className="relative h-full overflow-hidden bg-[#0a110d] p-4 text-[#eef3ec] sm:p-5">
			<div className="absolute -end-20 -top-24 size-52 rounded-full bg-[#c9ff5b]/10 blur-[60px]" />
			<header className="relative flex items-center justify-between gap-3">
				<p className="font-display text-sm font-bold tracking-[-0.06em]">
					wallet<span className="text-[#c9ff5b]">ly</span>
				</p>
				<div className="hidden items-center gap-3 text-[7px] font-medium text-white/45 sm:flex">
					<span>Overview</span>
					<span>Cards</span>
					<span>Activity</span>
				</div>
				<div className="flex items-center gap-1.5">
					<span className="grid size-5 place-items-center rounded-full border border-white/10 bg-white/[0.06]">
						<FiSearch className="size-2.5 text-white/65" />
					</span>
					<span className="grid size-5 place-items-center rounded-full bg-[#c9ff5b] text-[#0a100b]">
						<FiPlus className="size-2.5" />
					</span>
				</div>
			</header>

			<div className="relative mt-4 grid grid-cols-[1.25fr_0.75fr] gap-2.5">
				<div className="relative overflow-hidden rounded-xl bg-[#c9ff5b] p-3.5 text-[#0a100b]">
					<div className="absolute -right-6 -top-8 size-24 rounded-full border border-[#0a100b]/10" />
					<div className="flex items-start justify-between">
						<div>
							<p className="font-mono text-[6px] font-bold uppercase tracking-[0.16em] text-[#40521c]">
								Total balance
							</p>
							<p className="mt-1.5 font-display text-[clamp(1.1rem,3vw,1.65rem)] font-bold tracking-[-0.05em]">
								$12,480.50
							</p>
						</div>
						<span className="rounded-full bg-[#0a100b] px-2 py-1 text-[5.5px] font-semibold text-[#c9ff5b]">
							+8.4%
						</span>
					</div>

					<div className="mt-2 flex items-end justify-between">
						<svg viewBox="0 0 140 36" className="h-8 w-[62%] overflow-visible" aria-hidden="true">
							<path
								d="M2 30 C16 28, 18 18, 32 20 S50 29, 62 19 S78 8, 92 13 S112 22, 138 4"
								fill="none"
								stroke="#0a100b"
								strokeWidth="1.7"
								strokeLinecap="round"
							/>
							<circle cx="138" cy="4" r="2.5" fill="#0a100b" />
						</svg>
						<div className="text-end">
							<p className="font-mono text-[5.5px] text-[#40521c]">**** 4829</p>
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
								className="flex flex-col justify-between rounded-lg border border-white/10 bg-white/[0.045] p-2"
							>
								<Icon className="size-3 text-[#c9ff5b]" />
								<span className="mt-2 text-[5.5px] font-medium text-white/55">{action.label}</span>
							</div>
						);
					})}
				</div>
			</div>

			<div className="relative mt-2.5 rounded-xl border border-white/10 bg-white/[0.035] p-3">
				<div className="flex items-center justify-between">
					<p className="text-[7px] font-semibold text-white/80">Recent activity</p>
					<p className="text-[5.5px] text-white/35">View all</p>
				</div>
				<div className="mt-2 divide-y divide-white/[0.06]">
					{transactions.map((transaction) => {
						const Icon = transaction.icon;
						return (
							<div key={transaction.label} className="flex items-center gap-2 py-1.5">
								<span className="grid size-5 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-white/55">
									<Icon className="size-2.5" />
								</span>
								<div className="min-w-0 flex-1">
									<p className="truncate text-[6.5px] font-medium text-white/75">
										{transaction.label}
									</p>
									<p className="text-[5px] text-white/30">{transaction.date}</p>
								</div>
								<span
									className={`text-[6px] font-semibold ${
										transaction.amount.startsWith("+") ? "text-[#c9ff5b]" : "text-white/60"
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
			className="relative h-full w-full overflow-hidden rounded-[1.35rem] border border-line bg-surface"
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
