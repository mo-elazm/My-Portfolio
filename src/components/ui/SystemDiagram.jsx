/**
 * Zero-JS architecture diagram. Paths and node LEDs animate with pure CSS
 * (`stroke-dashoffset` / opacity), so the whole thing runs on the compositor.
 * Forced LTR: the flow direction must never mirror in Arabic.
 */
export default function SystemDiagram() {
	return (
		<div dir="ltr" className="sys-diagram mt-5">
			<div className="sys-diagram-head">
				<span className="sys-diagram-title">Live architecture</span>
				<span className="sys-live">
					<span className="sys-live-dot" aria-hidden="true" />
					Sync
				</span>
			</div>

			<svg
				viewBox="0 0 320 140"
				className="sys-svg mt-2"
				role="presentation"
				focusable="false"
			>
				{/* Connecting tracks */}
				<path className="sys-track" d="M138 24 H182" />
				<path className="sys-track" d="M248 40 V100" />
				<path className="sys-track" d="M182 116 H138" />

				{/* Soft glow underneath the moving packets */}
				<path className="sys-halo" d="M138 24 H182" />
				<path className="sys-halo" d="M248 40 V100" />
				<path className="sys-halo" d="M182 116 H138" />

				{/* Data packets */}
				<path className="sys-flow" d="M138 24 H182" />
				<path className="sys-flow sys-flow-b" d="M248 40 V100" />
				<path className="sys-flow sys-flow-c" d="M182 116 H138" />

				{/* Next.js UI */}
				<g className="sys-node">
					<rect x="6" y="8" width="132" height="32" rx="9" />
					<circle className="sys-node-led" cx="18" cy="24" r="2.4" />
					<text x="28" y="27.5">
						Next.js UI
					</text>
				</g>

				{/* State & GSAP */}
				<g className="sys-node">
					<rect x="182" y="8" width="132" height="32" rx="9" />
					<circle className="sys-node-led sys-node-led-b" cx="194" cy="24" r="2.4" />
					<text x="204" y="27.5">
						State &amp; GSAP
					</text>
				</g>

				{/* APIs & Supabase */}
				<g className="sys-node">
					<rect x="182" y="100" width="132" height="32" rx="9" />
					<circle className="sys-node-led sys-node-led-c" cx="194" cy="116" r="2.4" />
					<text x="204" y="119.5">
						APIs &amp; Supabase
					</text>
				</g>

				{/* Data Analysis */}
				<g className="sys-node">
					<rect x="6" y="100" width="132" height="32" rx="9" />
					<circle className="sys-node-led sys-node-led-d" cx="18" cy="116" r="2.4" />
					<text x="28" y="119.5">
						Data Analysis
					</text>
				</g>
			</svg>
		</div>
	);
}
