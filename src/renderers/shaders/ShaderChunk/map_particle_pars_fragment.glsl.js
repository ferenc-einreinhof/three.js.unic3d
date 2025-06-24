export default /* glsl */`
#if defined( USE_POINTS_UV )

	varying vec2 vUv;

#else

	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

		uniform mat3 uvTransform;

	#endif

#endif

#ifdef USE_MAP

	uniform sampler2D map;

	uniform float mapSaturation;
	uniform vec2 mapLevel;

#endif

#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;
	uniform vec2 alphaMapLevel;

#endif
`;
