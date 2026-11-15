"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/scrollState";
import { astrolabeState } from "@/lib/astrolabeState";
import { cn } from "@/utils/cn";

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

// Deterministic PRNG so the constellation is identical across renders.
function mulberry32(seed: number) {
	let value = seed;

	return () => {
		value |= 0;
		value = (value + 0x6d2b79f5) | 0;
		let t = Math.imul(value ^ (value >>> 15), 1 | value);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

function Constellation({ theme, reduceMotion }: { theme: Theme; reduceMotion: boolean }) {
	const ref = useRef<THREE.Points>(null);
	const isDark = theme === "dark";

	const positions = useMemo(() => {
		const count = 110;
		const random = mulberry32(20261114);
		const array = new Float32Array(count * 3);

		for (let index = 0; index < count; index += 1) {
			const radius = 3.1 + random() * 2.6;
			const theta = random() * Math.PI * 2;
			const phi = Math.acos(2 * random() - 1);

			array[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
			array[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.72;
			array[index * 3 + 2] = radius * Math.cos(phi);
		}

		return array;
	}, []);

	useFrame(({ clock }) => {
		if (ref.current && !reduceMotion) {
			ref.current.rotation.y = clock.elapsedTime * 0.018;
			ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.08) * 0.08;
		}
	});

	return (
		<points ref={ref}>
			<bufferGeometry>
				<bufferAttribute attach="attributes-position" args={[positions, 3]} />
			</bufferGeometry>
			<pointsMaterial
				color={isDark ? "#A5B4FC" : "#6366F1"}
				size={0.026}
				sizeAttenuation
				transparent
				opacity={isDark ? 0.62 : 0.42}
				depthWrite={false}
			/>
		</points>
	);
}

type OrbitalRingProps = {
	radius: number;
	tilt: [number, number, number];
	speed: number;
	phase: number;
	nodeAngles: number[];
	theme: Theme;
	reduceMotion: boolean;
};

function OrbitalRing({
	radius,
	tilt,
	speed,
	phase,
	nodeAngles,
	theme,
	reduceMotion,
}: OrbitalRingProps) {
	const wobble = useRef<THREE.Group>(null);
	const spin = useRef<THREE.Group>(null);
	const isDark = theme === "dark";
	const ringColor = isDark ? "#818CF8" : "#4338CA";
	const nodeColor = isDark ? "#E0E7FF" : "#4F46E5";

	useFrame(({ clock }, delta) => {
		const dt = Math.min(delta, 0.05);
		const time = clock.elapsedTime;

		if (spin.current && !reduceMotion) {
			spin.current.rotation.z += dt * speed;
		}

		if (wobble.current && !reduceMotion) {
			wobble.current.rotation.x = tilt[0] + Math.sin(time * 0.24 + phase) * 0.075;
			wobble.current.rotation.y = tilt[1] + Math.cos(time * 0.19 + phase) * 0.075;
		}
	});

	return (
		<group ref={wobble} rotation={tilt}>
			<mesh>
				<torusGeometry args={[radius, 0.011, 8, 256]} />
				<meshStandardMaterial
					color={ringColor}
					metalness={0.92}
					roughness={0.2}
					emissive={ringColor}
					emissiveIntensity={isDark ? 0.75 : 0.3}
					transparent
					opacity={isDark ? 0.95 : 0.88}
				/>
			</mesh>

			<group ref={spin}>
				{nodeAngles.map((angle, index) => (
					<group key={`${radius}-${angle}-${index}`} rotation={[0, 0, angle]}>
						<mesh position={[radius, 0, 0]}>
							<sphereGeometry args={[0.048, 16, 16]} />
							<meshBasicMaterial color={nodeColor} />
						</mesh>
						<mesh position={[radius, 0, 0]} scale={2.7}>
							<sphereGeometry args={[0.048, 12, 12]} />
							<meshBasicMaterial
								color={nodeColor}
								transparent
								opacity={isDark ? 0.18 : 0.12}
								depthWrite={false}
							/>
						</mesh>
					</group>
				))}
			</group>
		</group>
	);
}

function CrystallineCore({ theme, reduceMotion }: { theme: Theme; reduceMotion: boolean }) {
	const float = useRef<THREE.Group>(null);
	const inner = useRef<THREE.Mesh>(null);
	const isDark = theme === "dark";

	useFrame(({ clock }, delta) => {
		const dt = Math.min(delta, 0.05);
		const time = clock.elapsedTime;

		if (float.current) {
			if (reduceMotion) {
				float.current.position.y = 0;
				float.current.scale.setScalar(1);
			} else {
				float.current.position.y = Math.sin(time * 0.55) * 0.075;
				float.current.scale.setScalar(1 + Math.sin(time * 0.8) * 0.014);
			}
		}

		if (inner.current && !reduceMotion) {
			inner.current.rotation.y += dt * 0.16;
			inner.current.rotation.x += dt * 0.055;
		}
	});

	return (
		<group ref={float}>
			<mesh>
				<icosahedronGeometry args={[1, 1]} />
				<meshPhysicalMaterial
					color={isDark ? "#101018" : "#AEB4CE"}
					metalness={isDark ? 0.94 : 0.9}
					roughness={isDark ? 0.16 : 0.18}
					clearcoat={1}
					clearcoatRoughness={0.14}
					emissive={isDark ? "#1E1B4B" : "#4338CA"}
					emissiveIntensity={isDark ? 0.7 : 0.12}
					flatShading
				/>
			</mesh>

			<mesh scale={1.045}>
				<icosahedronGeometry args={[1, 1]} />
				<meshBasicMaterial
					color={isDark ? "#818CF8" : "#4F46E5"}
					wireframe
					transparent
					opacity={isDark ? 0.22 : 0.16}
					depthWrite={false}
				/>
			</mesh>

			<mesh ref={inner} scale={0.68}>
				<icosahedronGeometry args={[1, 0]} />
				<meshBasicMaterial
					color={isDark ? "#6366F1" : "#4338CA"}
					wireframe
					transparent
					opacity={isDark ? 0.5 : 0.36}
					depthWrite={false}
				/>
			</mesh>

			<mesh scale={2.1}>
				<sphereGeometry args={[1, 32, 32]} />
				<meshBasicMaterial
					color={isDark ? "#6366F1" : "#4338CA"}
					transparent
					opacity={isDark ? 0.07 : 0.04}
					blending={THREE.AdditiveBlending}
					depthWrite={false}
				/>
			</mesh>
		</group>
	);
}

/**
 * Procedural HDR environment so the metallic core and rings actually reflect
 * something. Without it, `metalness` near 1 renders as a flat black blob.
 * Built from emissive planes and baked with PMREM, so no external asset ships.
 */
function StudioEnvironment({ theme }: { theme: Theme }) {
	const gl = useThree((state) => state.gl);
	const isDark = theme === "dark";

	// Bake the procedural room into a PMREM texture. The texture is attached to
	// the scene declaratively via <primitive attach="environment">, so we never
	// mutate the scene object returned by useThree.
	const texture = useMemo(() => {
		const pmrem = new THREE.PMREMGenerator(gl);
		const room = new THREE.Scene();
		room.background = new THREE.Color(isDark ? "#07070a" : "#dfe2ee");

		const panels: THREE.Mesh[] = [];
		const addPanel = (
			color: string,
			intensity: number,
			position: [number, number, number],
			rotation: [number, number, number],
			size: number,
		) => {
			const material = new THREE.MeshBasicMaterial({
				color: new THREE.Color(color).multiplyScalar(intensity),
				side: THREE.DoubleSide,
			});
			const mesh = new THREE.Mesh(new THREE.PlaneGeometry(size, size), material);
			mesh.position.set(...position);
			mesh.rotation.set(...rotation);
			room.add(mesh);
			panels.push(mesh);
		};

		addPanel("#FFFFFF", isDark ? 2.6 : 1.05, [0, 6, 0], [-Math.PI / 2, 0, 0], 14);
		addPanel(isDark ? "#818CF8" : "#4338CA", isDark ? 2.4 : 0.6, [-6, 0.5, 2], [0, Math.PI / 2, 0], 10);
		addPanel(isDark ? "#6366F1" : "#4F46E5", isDark ? 1.6 : 0.45, [6, 1.5, -2], [0, -Math.PI / 2, 0], 8);
		addPanel("#FFFFFF", isDark ? 0.8 : 0.45, [0, -6, 0], [Math.PI / 2, 0, 0], 11);

		const generated = pmrem.fromScene(room, 0.02).texture;

		pmrem.dispose();
		panels.forEach((mesh) => {
			mesh.geometry.dispose();
			(mesh.material as THREE.Material).dispose();
		});
		room.clear();

		return generated;
	}, [gl, isDark]);

	useEffect(() => () => texture.dispose(), [texture]);

	return <primitive object={texture} attach="environment" />;
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
	const root = useRef<THREE.Group>(null);
	const lights = useRef<THREE.Group>(null);
	const assembly = useRef<THREE.Group>(null);
	const smooth = useRef({ x: 0, y: 0 });
	const viewport = useThree((state) => state.viewport);
	const isCompact = viewport.width < 6;
	const isDark = theme === "dark";
	// Fit the widest orbit (2.45 world units) inside the compact viewport width
	// so the sculpture never touches a horizontal edge on phones.
	const scale = isCompact ? Math.min(0.42, (viewport.width * 0.4) / 2.45) : 0.5;

	useFrame(({ clock }, delta) => {
		const group = root.current;

		if (!group) {
			return;
		}

		const dt = Math.min(delta, 0.05);
		const time = clock.elapsedTime;
		const velocity = THREE.MathUtils.clamp(scrollState.velocity * 0.045, -1.2, 1.2);
		const ease = 1 - Math.pow(0.001, dt);

		smooth.current.x += (pointer.current.y * 0.24 - smooth.current.x) * ease;
		smooth.current.y += (pointer.current.x * 0.4 - smooth.current.y) * ease;

		// Base position is the Hero's trailing flank. ScrollTrigger writes
		// offsets on top of it as the astrolabe travels between sections.
		const baseX = isCompact ? 0 : Math.min(2.35, viewport.width * 0.23);
		const baseY = isCompact ? -0.85 : 1.82;

		group.rotation.x =
			smooth.current.x + Math.sin(time * 0.18) * 0.025 + astrolabeState.tiltX;
		group.rotation.y =
			smooth.current.y + velocity * 0.3 + astrolabeState.spin;
		group.rotation.z = velocity * 0.06 + astrolabeState.tiltZ;
		group.position.x = baseX + astrolabeState.offsetX;
		group.position.y =
			baseY + astrolabeState.offsetY + velocity * 0.12;
		group.scale.setScalar(scale * astrolabeState.scale);

		if (lights.current) {
			lights.current.position.copy(group.position);
		}

		if (assembly.current && !reduceMotion) {
			assembly.current.rotation.y += dt * 0.055;
		}
	});

	return (
		<>
			<group ref={lights}>
				<pointLight
					position={[0, 0.6, 2.6]}
					intensity={isDark ? 14 : 9}
					distance={8}
					decay={2}
					color={isDark ? "#C7D2FE" : "#FFFFFF"}
				/>
				<pointLight
					position={[-1.6, -0.9, -2.4]}
					intensity={isDark ? 22 : 12}
					distance={10}
					decay={2}
					color={isDark ? "#818CF8" : "#4338CA"}
				/>
			</group>

			<group ref={root}>
				<group ref={assembly}>
				<CrystallineCore theme={theme} reduceMotion={reduceMotion} />

				<OrbitalRing
					radius={1.72}
					tilt={[Math.PI / 2.15, 0.18, 0]}
					speed={0.17}
					phase={0.4}
					nodeAngles={[0.4, 3.5]}
					theme={theme}
					reduceMotion={reduceMotion}
				/>
				<OrbitalRing
					radius={2.02}
					tilt={[Math.PI / 3.1, 0.62, Math.PI / 5]}
					speed={-0.115}
					phase={1.7}
					nodeAngles={[1.2, 3.1, 5.2]}
					theme={theme}
					reduceMotion={reduceMotion}
				/>
				<OrbitalRing
					radius={2.32}
					tilt={[0.38, Math.PI / 2.35, -0.42]}
					speed={0.078}
					phase={3.2}
					nodeAngles={[0.2, 3.9]}
					theme={theme}
					reduceMotion={reduceMotion}
				/>

				<Constellation theme={theme} reduceMotion={reduceMotion} />
				</group>
			</group>
		</>
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
			{ threshold: 0.02 },
		);

		observer.observe(node);

		return () => observer.disconnect();
	}, []);

	const active = inView && !reduceMotion;
	const isDark = theme === "dark";

	return (
		<div
			ref={host}
			aria-hidden="true"
			className={cn("pointer-events-none absolute inset-0 z-0 h-full w-full", className)}
		>
			<Canvas
				dpr={[1, 1.5]}
				camera={{ position: [0, 0, 8.5], fov: 42 }}
				frameloop={active ? "always" : "demand"}
				gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
				style={{ pointerEvents: "none" }}
				onCreated={({ gl }) => {
					gl.setClearAlpha(0);
				}}
			>
				<StudioEnvironment theme={theme} />
				<ambientLight intensity={isDark ? 0.28 : 0.75} />
				<directionalLight
					position={[5, 7, 8]}
					intensity={isDark ? 3.2 : 3.4}
					color={isDark ? "#E0E7FF" : "#FFFFFF"}
				/>
				<directionalLight
					position={[-6, -3, -4]}
					intensity={isDark ? 1.8 : 1.2}
					color={isDark ? "#6366F1" : "#4338CA"}
				/>
				<directionalLight
					position={[3, 5, -7]}
					intensity={isDark ? 4.5 : 2.4}
					color={isDark ? "#818CF8" : "#4F46E5"}
				/>
				<Sculpture theme={theme} pointer={pointer} reduceMotion={reduceMotion} />
			</Canvas>
		</div>
	);
}
