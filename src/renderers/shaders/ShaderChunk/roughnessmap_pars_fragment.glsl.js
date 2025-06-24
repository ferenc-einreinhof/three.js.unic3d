export default /* glsl */`
#ifdef USE_ROUGHNESSMAP

	uniform sampler2D roughnessMap;
	uniform vec2 roughnessMapLevel;

#endif

#ifdef USE_COLOR_ROUGHNESS_FACTOR
	uniform vec3 roughnessColorFactor;
#endif

#ifdef USE_ROUGHNESS_OFFSET
	uniform vec2 roughnessOffset;
#endif
`;
