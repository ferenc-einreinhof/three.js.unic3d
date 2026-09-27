export default /* glsl */`
#ifndef U3D_BLURRED_TEXTURE
#define U3D_BLURRED_TEXTURE

	// A cheap, approximate blur (unic3d): two fetches from coarser mip levels.
	// "blur" is the width of the blur as a fraction of the texture (0.05 = 5% of
	// it), so the look is the same at any texture resolution and camera distance. It needs the texture's mipmaps:
	// without them it reads the full-size image and does nothing.
	//
	// Included from each *_pars_fragment that uses it, hence the guard. Those include
	// it only in the USE_*_BLUR variant, which a material gets while its blur is
	// above 0 (WebGLPrograms): at 0 the program has no blur code at all. It takes
	// screen-space derivatives, so call it outside any per-pixel condition.
	vec4 textureBlurred( sampler2D tex, vec2 uv, float blur ) {

		vec2 size = vec2( textureSize( tex, 0 ) );
		vec2 dx = dFdx( uv * size );
		vec2 dy = dFdy( uv * size );

		// The level the hardware would pick for this pixel, and the level whose
		// texels are "blur" wide. Never sharper than the first, or a distant surface
		// would shimmer.
		float lodView = 0.5 * log2( max( dot( dx, dx ), dot( dy, dy ) ) );
		float lodBlur = log2( blur * max( size.x, size.y ) );

		// The two levels are blended here rather than by the sampler. Hardware
		// trilinear filtering is allowed to cut corners, and does: measured on RADV,
		// a blur animating through a level held one image for a third of the way,
		// then jumped. Whole-number levels are never blended by the sampler.
		//
		// The weight follows the blur's width, not its log: blended by the log, the
		// blur sped up at the start of each level and slowed down towards its end,
		// which read as a step every time the width doubled.
		float lod = max( lodView, lodBlur );
		float l0 = floor( lod );
		return mix( textureLod( tex, uv, l0 ), textureLod( tex, uv, l0 + 1.0 ), exp2( lod - l0 ) - 1.0 );

	}

#endif
`;
