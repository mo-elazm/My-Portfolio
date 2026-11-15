// Shared, render-free choreography state for the persistent astrolabe.
// ScrollTrigger writes these offsets; HeroScene3D reads them every frame.
export const astrolabeState = {
	offsetX: 0,
	offsetY: 0,
	scale: 1,
	tiltX: 0,
	tiltZ: 0,
	spin: 0,
};

export const resetAstrolabeState = () => {
	astrolabeState.offsetX = 0;
	astrolabeState.offsetY = 0;
	astrolabeState.scale = 1;
	astrolabeState.tiltX = 0;
	astrolabeState.tiltZ = 0;
	astrolabeState.spin = 0;
};
