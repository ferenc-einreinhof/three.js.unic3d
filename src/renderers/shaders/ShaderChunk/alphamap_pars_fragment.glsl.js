export default /* glsl */`
#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;
	uniform vec2 alphaMapLevel;
	#ifdef USE_ALPHAMAP_BLUR

		uniform float alphaMapBlur;

		#include <blurred_texture_pars_fragment>

	#endif

#endif
`;
