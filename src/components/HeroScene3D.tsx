"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/scrollState";

type Theme = "dark" | "light";
type PointerState = { current: { x: number; y: number } };

function usePointer(): PointerState {
	const pointer = useRef({ x: 0, y: 0 });

	useEffect(() => {
		const onMove = (event: PointerEvent) => {
			pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
			pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
		};

		window.addEventListener("pointermove", onMove, { passive: true });

		return () => window.removeEventListener("pointermove", onMove);
	}, []);

	return pointer;
}

function Sculpture({
	theme,
	pointer,
	reduceMotion,
}: {
	theme: Theme;
	pointer: PointerState;
	reduceMotion: boolean;
}) {
	const tiltGroup = useRef<THREE.Group>(null);
	const spinGroup = useRef<THREE.Group>(null);
	const smooth = useRef({ x: 0, y: 0 });

	const isDark = theme === "dark";
	const accent = isDark ? "#6366F1" : "#4338CA";
	const rim = isDark ? "#818CF8" : "#4F46E5";

	useFrame((state, delta) => {
		const tilt = tiltGroup.current;
		const spin = spinGroup.current;

		if (!tilt || !spin) {
			return;
		}

		const dt = Math.min(delta, 0.05);
		const time = state.clock.elapsedTime;
		const velocity = THREE.MathUtils.clamp(scrollState.velocity * 0.05, -1.4, 1.4);

		const lerp = 1 - Math.pow(0.001, dt);
		smooth.current.x += (pointer.current.y * 0.34 - smooth.current.x) * lerp;
		smooth.current.y += (pointer.current.x * 0.5 - smooth.current.y) * lerp;

		tilt.rotation.x = smooth.current.x + Math.sin(time * 0.22) * 0.05;
		tilt.rotation.y = smooth.current.y + velocity * 0.35;
		tilt.position.y = velocity * 0.16;

		if (!reduceMotion) {
			spin.rotation.y += dt * 0.18;
			spin.rotation.x += dt * 0.04;
		}
	});

	return (
		<group ref={tiltGroup}>
			<group ref={spinGroup}>
				<mesh>
					<torusKnotGeometry args={[1, 0.3, 180, 32, 2, 3]} />
					<meshPhysicalMaterial
						color={isDark ? "#5b5bd6" : "#a5b4fc"}
						metalness={0.62}
						roughness={0.24}
						clearcoat={1}
						clearcoatRoughness={0.28}
						transparent
						opacity={isDark ? 0.62 : 0.5}
						emissive={isDark ? "#312e81" : "#c7d2fe"}
						emissiveIntensity={isDark ? 0.45 : 0.12}
					/>
				</mesh>

				<mesh scale={1.34}>
					<icosahedronGeometry args={[1.55, 1]} />
					<meshBasicMaterial
						color={accent}
						wireframe
						transparent
						opacity={isDark ? 0.34 : 0.42}
					/>
				</mesh>

				<mesh scale={1.62} rotation={[0.45, 0.85, 0.1]}>
					<icosahedronGeometry args={[1.55, 0]} />
					<meshBasicMaterial
						color={rim}
						wireframe
						transparent
						opacity={isDark ? 0.12 : 0.16}
					/>
				</mesh>
			</group>
		</group>
	);
}

export default function HeroScene3D({
	theme = "dark",
	className,
}: {
	theme?: Theme;
	className?: string;
}) {
	const host = useRef<HTMLDivElement>(null);
	const pointer = usePointer();
	const [inView, setInView] = useState(true);
	const [reduceMotion] = useState(
		() =>
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches,
	);

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

	const active = inView && !reduceMotion;
	const isDark = theme === "dark";

	return (
		<div ref={host} aria-hidden="true" className={className}>
			<Canvas
				dpr={[1, 1.5]}
				camera={{ position: [0, 0, 5.4], fov: 42 }}
				frameloop={active ? "always" : "demand"}
				gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
				onCreated={({ gl }) => {
					gl.setClearAlpha(0);
				}}
			>
				<ambientLight intensity={isDark ? 0.4 : 0.95} />
				<directionalLight
					position={[4, 6, 6]}
					intensity={isDark ? 3.2 : 3.8}
					color={isDark ? "#c7d2fe" : "#ffffff"}
				/>
				<directionalLight
					position={[-6, -2, 2]}
					intensity={isDark ? 1.4 : 1.1}
					color={isDark ? "#6366F1" : "#4338CA"}
				/>
				<pointLight
					position={[0, -3, -4]}
					intensity={22}
					distance={14}
					decay={2}
					color={isDark ? "#818CF8" : "#4338CA"}
				/>
				<Sculpture theme={theme} pointer={pointer} reduceMotion={reduceMotion} />
			</Canvas>
		</div>
	);
}
