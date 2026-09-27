export default /* glsl */`
#ifdef USE_AOMAP

	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
	uniform vec2 aoMapLevel;
	uniform float aoMapFade;

	#ifdef USE_AOMAP_BLUR

		uniform float aoMapBlur;

		#include <blurred_texture_pars_fragment>

	#endif

#endif
`;
