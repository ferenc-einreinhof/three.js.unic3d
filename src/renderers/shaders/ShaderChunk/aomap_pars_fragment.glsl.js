export default /* glsl */`
#ifdef USE_AOMAP

	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
	uniform vec2 aoMapLevel;
	uniform float aoMapFade;

#endif
`;
