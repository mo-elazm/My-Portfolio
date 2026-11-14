import { FiMapPin, FiSearch, FiFilter, FiCheck } from "react-icons/fi";

const foundItems = [
	{ title: "Black backpack", meta: "Library · Today", tag: "Found" },
	{ title: "AirPods case", meta: "Lab 204 · Yesterday", tag: "Lost" },
];

function FoundItPreview() {
	return (
		<div className="relative flex h-full items-center justify-center overflow-hidden bg-[#f4f4f5] p-3">
			<div className="dot-grid absolute inset-0 opacity-40" aria-hidden="true" />
			<div className="relative h-full w-[52%] min-w-[128px] max-w-[190px] rounded-[1.4rem] border border-zinc-200 bg-white p-1.5 shadow-[0_16px_40px_-18px_rgba(9,9,11,0.35)]">
				<div className="flex h-full flex-col overflow-hidden rounded-[1rem] bg-zinc-50 p-2">
					<div className="flex items-center justify-between">
						<span className="text-[8px] font-extrabold tracking-[-0.04em] text-zinc-900">
							Found<span className="text-indigo-600">It</span>
						</span>
						<span className="size-1.5 rounded-full bg-indigo-500" />
					</div>

					<div className="mt-1.5 flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-1.5 py-1">
						<FiSearch className="size-2 shrink-0 text-zinc-400" />
						<span className="truncate text-[5.5px] text-zinc-400">Search campus items…</span>
					</div>

					<div className="mt-1.5 flex gap-1">
						{["All", "Lost", "Found"].map((chip, index) => (
							<span
								key={chip}
								className={`rounded-full px-1.5 py-0.5 text-[5px] font-semibold ${
									index === 0 ? "bg-indigo-600 text-white" : "bg-white text-zinc-500"
								}`}
							>
								{chip}
							</span>
						))}
					</div>

					<div className="mt-1.5 space-y-1">
						{foundItems.map((item) => (
							<div
								key={item.title}
								className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white p-1.5"
							>
								<span className="grid size-4 shrink-0 place-items-center rounded bg-indigo-50 text-indigo-600">
									<FiMapPin className="size-2" />
								</span>
								<span className="min-w-0 flex-1">
									<span className="block truncate text-[5.5px] font-semibold text-zinc-800">
										{item.title}
									</span>
									<span className="block truncate text-[4.5px] text-zinc-400">
										{item.meta}
									</span>
								</span>
								<span className="shrink-0 rounded-full bg-zinc-100 px-1 py-0.5 text-[4.5px] font-semibold text-zinc-500">
									{item.tag}
								</span>
							</div>
						))}
					</div>

					<div className="mt-auto flex items-center justify-between rounded-md bg-indigo-600 px-1.5 py-1 text-[5px] font-semibold text-white">
						<span className="inline-flex items-center gap-1">
							<FiFilter className="size-2" />
							Filters
						</span>
						<span>3 active</span>
					</div>
				</div>
			</div>
		</div>
	);
}

const courseCards = [
	{ title: "React Patterns", tag: "Frontend", color: "from-indigo-500 to-indigo-800" },
	{ title: "Node APIs", tag: "Backend", color: "from-zinc-600 to-zinc-900" },
	{ title: "Flutter Basics", tag: "Mobile", color: "from-violet-500 to-violet-800" },
];

function CourseWavePreview() {
	return (
		<div className="relative h-full overflow-hidden bg-[#f4f4f5] p-3 text-zinc-900">
			<div className="flex h-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white">
				<div className="flex h-5 shrink-0 items-center gap-1.5 border-b border-zinc-200 bg-zinc-100 px-2">
					<span className="size-1.5 rounded-full bg-zinc-300" />
					<span className="size-1.5 rounded-full bg-zinc-300" />
					<span className="size-1.5 rounded-full bg-zinc-300" />
					<span className="mx-auto truncate font-mono text-[5px] text-zinc-400">
						coursewave.app
					</span>
				</div>

				<div className="flex min-h-0 flex-1 flex-col p-2.5">
					<div className="flex items-center justify-between gap-2">
						<span className="text-[7px] font-extrabold tracking-[-0.04em]">
							course<span className="text-indigo-600">wave</span>
						</span>
						<div className="flex items-center gap-2 text-[5px] font-medium text-zinc-500">
							<span>Courses</span>
							<span>Paths</span>
							<span className="rounded-full bg-zinc-900 px-1.5 py-0.5 text-white">
								Sign in
							</span>
						</div>
					</div>

					<div className="mt-2 flex items-end justify-between gap-2">
						<div className="min-w-0">
							<p className="font-mono text-[4.5px] font-bold uppercase tracking-[0.16em] text-indigo-600">
								Learn by building
							</p>
							<p className="mt-1 max-w-[140px] text-[clamp(0.65rem,2.2vw,1rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
								Skills that ship.
							</p>
						</div>
						<div className="flex shrink-0 items-center gap-1 rounded-full border border-zinc-200 bg-white px-1.5 py-1 text-[4.5px] text-zinc-400">
							<FiSearch className="size-1.5" />
							Search courses
						</div>
					</div>

					<div className="mt-2 grid grid-cols-3 gap-1.5">
						{courseCards.map((course) => (
							<div key={course.title} className="overflow-hidden rounded-md border border-zinc-200 bg-white p-1">
								<div
									className={`relative h-9 overflow-hidden rounded bg-gradient-to-br ${course.color}`}
								>
									<span className="absolute start-1 top-1 rounded-full bg-black/25 px-1 py-0.5 text-[3.5px] font-semibold text-white/85">
										{course.tag}
									</span>
									<span className="absolute -right-3 -top-3 size-8 rounded-full border border-white/15" />
								</div>
								<p className="mt-1 truncate text-[4.5px] font-bold">{course.title}</p>
								<p className="mt-0.5 flex items-center gap-0.5 text-[4px] text-zinc-400">
									<FiCheck className="size-1.5 text-indigo-500" />
									12 lessons
								</p>
							</div>
						))}
					</div>

					<div className="mt-auto flex items-center justify-between rounded-md border border-zinc-200 bg-zinc-50 px-1.5 py-1">
						<span className="flex items-center gap-1 text-[4.5px] font-semibold text-zinc-500">
							<span className="size-1.5 rounded-full bg-indigo-500" />
							Zustand state synced
						</span>
						<span className="font-mono text-[4.5px] text-zinc-400">client-side nav</span>
					</div>
				</div>
			</div>
		</div>
	);
}

const routes = [
	{ method: "POST", path: "/api/auth/login", status: "200" },
	{ method: "GET", path: "/api/products", status: "200" },
	{ method: "PATCH", path: "/api/orders/:id", status: "204" },
];

function StoreApiPreview() {
	return (
		<div className="relative h-full overflow-hidden bg-[#111113] p-3 text-zinc-100">
			<div
				aria-hidden="true"
				className="absolute -end-10 -top-12 size-32 rounded-full bg-indigo-500/20 blur-[40px]"
			/>
			<div className="relative flex h-full flex-col">
				<div className="flex items-center justify-between">
					<span className="inline-flex items-center gap-1.5 text-[7px] font-extrabold tracking-[-0.03em]">
						<span className="size-1.5 rounded-full bg-emerald-400" />
						store-api
					</span>
					<span className="rounded-full border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[4.5px] text-zinc-400">
						v1.0 · POS
					</span>
				</div>

				<div className="mt-2 space-y-1">
					{routes.map((route) => (
						<div
							key={route.path}
							className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-1"
						>
							<span
								className={`shrink-0 rounded px-1 py-0.5 font-mono text-[4px] font-bold ${
									route.method === "GET"
										? "bg-emerald-500/15 text-emerald-300"
										: route.method === "POST"
											? "bg-indigo-500/20 text-indigo-300"
											: "bg-amber-500/15 text-amber-300"
								}`}
							>
								{route.method}
							</span>
							<span className="min-w-0 flex-1 truncate font-mono text-[5px] text-zinc-300">
								{route.path}
							</span>
							<span className="shrink-0 font-mono text-[4.5px] text-zinc-500">
								{route.status}
							</span>
						</div>
					))}
				</div>

				<div className="mt-2 rounded-md border border-white/10 bg-black/30 p-1.5 font-mono text-[4.5px] leading-[1.6] text-zinc-400">
					<p>
						<span className="text-indigo-300">{"{"}</span>
					</p>
					<p className="ps-1.5">
						<span className="text-emerald-300">&quot;ok&quot;</span>: true,
					</p>
					<p className="ps-1.5">
						<span className="text-emerald-300">&quot;auth&quot;</span>:{" "}
						<span className="text-amber-300">&quot;jwt&quot;</span>,
					</p>
					<p className="ps-1.5">
						<span className="text-emerald-300">&quot;errors&quot;</span>:{" "}
						<span className="text-zinc-500">&quot;centralized&quot;</span>
					</p>
					<p>
						<span className="text-indigo-300">{"}"}</span>
					</p>
				</div>

				<div className="mt-auto flex items-center justify-between border-t border-white/10 pt-1.5">
					<span className="font-mono text-[4.5px] text-zinc-500">MongoDB · Mongoose</span>
					<span className="inline-flex items-center gap-1 font-mono text-[4.5px] text-emerald-300">
						<span className="size-1 rounded-full bg-emerald-400" />
						validated
					</span>
				</div>
			</div>
		</div>
	);
}

export default function CaseStudyVisual({ kind }) {
	return (
		<div
			aria-hidden="true"
			dir="ltr"
			className="relative h-full w-full overflow-hidden rounded-[1.15rem] border border-line bg-surface-2"
		>
			{kind === "mobile" ? <FoundItPreview /> : null}
			{kind === "web" ? <CourseWavePreview /> : null}
			{kind === "backend" ? <StoreApiPreview /> : null}
		</div>
	);
}
