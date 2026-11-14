import { ImageResponse } from "next/og";

export const alt = "Mohamed Abo-Elazm — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					position: "relative",
					overflow: "hidden",
					background: "linear-gradient(135deg, #09090B 0%, #10101c 55%, #15132a 100%)",
					padding: "72px",
					fontFamily: "sans-serif",
				}}
			>
				<div
					style={{
						position: "absolute",
						width: 620,
						height: 620,
						borderRadius: 9999,
						top: -320,
						right: -180,
						background: "rgba(99,102,241,0.16)",
					}}
				/>
				<div
					style={{
						position: "absolute",
						width: 460,
						height: 460,
						borderRadius: 9999,
						bottom: -300,
						left: -140,
						background: "rgba(139,92,246,0.12)",
					}}
				/>

				<div style={{ display: "flex", alignItems: "center", gap: 18 }}>
					<div
						style={{
							width: 58,
							height: 58,
							borderRadius: 17,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							background: "#6366F1",
							color: "#FFFFFF",
							fontSize: 30,
							fontWeight: 800,
						}}
					>
						M
					</div>
					<div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
						<span style={{ fontSize: 22, fontWeight: 700, color: "#FAFAFA" }}>
							Mohamed Abo-Elazm
						</span>
						<span style={{ fontSize: 16, color: "#A1A1AA" }}>
							Software Engineer · Web, Backend &amp; Mobile
						</span>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							fontSize: 78,
							fontWeight: 800,
							lineHeight: 1.02,
							letterSpacing: "-0.045em",
							color: "#FAFAFA",
							maxWidth: 900,
						}}
					>
						<span>Products from</span>
						<span style={{ color: "#A5B4FC" }}>interface to API.</span>
					</div>
					<span style={{ fontSize: 24, color: "#A1A1AA" }}>
						Engineering case studies, stack and credentials.
					</span>
				</div>

				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						fontSize: 18,
						color: "#A1A1AA",
					}}
				>
					<span>Found It · CourseWave · Store API</span>
					<span style={{ color: "#A5B4FC" }}>Available for opportunities</span>
				</div>
			</div>
		),
		size,
	);
}
