export default /* glsl */`
#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;
	uniform vec2 alphaMapLevel;
	uniform float alphaMapBlur;

	#include <blurred_texture_pars_fragment>

#endif
`;
