// Shared, render-free scroll telemetry.
// MotionProvider writes the current Lenis velocity here and any
// animation layer (e.g. the 3D hero sculpture) can read it per frame.
export const scrollState = {
	velocity: 0,
	progress: 0,
};

export const resetScrollState = () => {
	scrollState.velocity = 0;
	scrollState.progress = 0;
};
