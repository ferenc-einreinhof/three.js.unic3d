export default /* glsl */`
#ifdef USE_ALPHAMAP

	#ifdef USE_ALPHAMAP_BLUR
		float alphaTexel = textureBlurred( alphaMap, vAlphaMapUv, alphaMapBlur ).g;
	#else
		float alphaTexel = texture2D( alphaMap, vAlphaMapUv ).g;
	#endif

	diffuseColor.a *= (alphaTexel - alphaMapLevel.x) / alphaMapLevel.y;

#endif
`;
