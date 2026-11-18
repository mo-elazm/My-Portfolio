"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/utils/cn";

type Theme = "dark" | "light";

const NODES: Array<[number, number, number]> = [
	[1.5, 0.44, 0.2],
	[-0.92, 1.22, -0.42],
	[-1.28, -0.78, 0.56],
];

function Beacon({ theme, reduceMotion }: { theme: Theme; reduceMotion: boolean }) {
	const root = useRef<THREE.Group>(null);
	const core = useRef<THREE.Mesh>(null);
	const isDark = theme === "dark";
	const ringColor = isDark ? "#818CF8" : "#4338CA";
	const nodeColor = isDark ? "#E0E7FF" : "#4F46E5";

	useFrame(({ clock }, delta) => {
		if (!root.current || reduceMotion) {
			return;
		}

		const dt = Math.min(delta, 0.05);

		root.current.rotation.y = clock.elapsedTime * 0.11;
		root.current.rotation.x = Math.sin(clock.elapsedTime * 0.14) * 0.14;

		if (core.current) {
			core.current.rotation.z += dt * 0.2;
		}
	});

	return (
		<group ref={root}>
			<mesh ref={core}>
				<icosahedronGeometry args={[0.92, 0]} />
				<meshStandardMaterial
					color={isDark ? "#141420" : "#F4F5FA"}
					metalness={isDark ? 0.92 : 0.35}
					roughness={isDark ? 0.24 : 0.6}
					emissive={isDark ? "#1E1B4B" : "#6366F1"}
					emissiveIntensity={isDark ? 0.65 : 0.04}
					flatShading
				/>
			</mesh>

			<mesh scale={1.04}>
				<icosahedronGeometry args={[0.92, 0]} />
				<meshBasicMaterial
					color={ringColor}
					wireframe
					transparent
					opacity={isDark ? 0.42 : 0.16}
				/>
			</mesh>

			<mesh scale={0.58}>
				<icosahedronGeometry args={[0.92, 0]} />
				<meshBasicMaterial
					color={ringColor}
					wireframe
					transparent
					opacity={isDark ? 0.55 : 0.2}
				/>
			</mesh>

			<mesh rotation={[Math.PI / 2.15, 0.28, 0]}>
				<torusGeometry args={[1.55, 0.012, 4, 64]} />
				<meshBasicMaterial
					color={ringColor}
					transparent
					opacity={isDark ? 0.8 : 0.45}
				/>
			</mesh>

			<mesh rotation={[Math.PI / 3.1, -0.55, Math.PI / 5]}>
				<torusGeometry args={[1.86, 0.009, 4, 64]} />
				<meshBasicMaterial
					color={ringColor}
					transparent
					opacity={isDark ? 0.5 : 0.3}
				/>
			</mesh>

			{NODES.map((position) => (
				<mesh key={position.join("-")} position={position}>
					<sphereGeometry args={[0.045, 8, 8]} />
					<meshBasicMaterial
						color={nodeColor}
						transparent
						opacity={isDark ? 1 : 0.55}
					/>
				</mesh>
			))}

			<mesh scale={2.4}>
				<sphereGeometry args={[1, 12, 12]} />
				<meshBasicMaterial
					color={ringColor}
					transparent
					opacity={isDark ? 0.05 : 0.03}
					blending={THREE.AdditiveBlending}
					depthWrite={false}
				/>
			</mesh>
		</group>
	);
}

export default function ContactScene3D({
	theme = "dark",
	className,
}: {
	theme?: Theme;
	className?: string;
}) {
	const host = useRef<HTMLDivElement>(null);
	const [inView, setInView] = useState(false);
	const [reduceMotion, setReduceMotion] = useState(
		() =>
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches,
	);
	const isDark = theme === "dark";

	useEffect(() => {
		const query = window.matchMedia("(prefers-reduced-motion: reduce)");
		const sync = () => setReduceMotion(query.matches);

		sync();
		query.addEventListener("change", sync);

		return () => query.removeEventListener("change", sync);
	}, []);

	// Same rule as the Hero: no frames are drawn outside the viewport, so only
	// one lightweight canvas can ever be live at a time.
	useEffect(() => {
		const node = host.current;

		if (!node) {
			return undefined;
		}

		const observer = new IntersectionObserver(
			([entry]) => setInView(entry.isIntersecting),
			{ threshold: 0.05 },
		);

		observer.observe(node);

		return () => observer.disconnect();
	}, []);

	const frameloop = reduceMotion ? "demand" : inView ? "always" : "never";

	return (
		<div
			ref={host}
			aria-hidden="true"
			className={cn("pointer-events-none absolute", className)}
		>
			<Canvas
				dpr={[1, 1.25]}
				camera={{ position: [0, 0, 5.4], fov: 40 }}
				frameloop={frameloop}
				gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
				style={{ pointerEvents: "none" }}
				onCreated={({ gl }) => {
					gl.setClearAlpha(0);
				}}
			>
				<ambientLight intensity={isDark ? 0.5 : 0.9} />
				<directionalLight
					position={[3, 4, 6]}
					intensity={isDark ? 2.8 : 2.4}
					color={isDark ? "#E0E7FF" : "#FFFFFF"}
				/>
				<pointLight
					position={[-3, -2, -3]}
					intensity={isDark ? 12 : 7}
					color={isDark ? "#6366F1" : "#4338CA"}
				/>
				<Beacon theme={theme} reduceMotion={reduceMotion} />
			</Canvas>
		</div>
	);
}
