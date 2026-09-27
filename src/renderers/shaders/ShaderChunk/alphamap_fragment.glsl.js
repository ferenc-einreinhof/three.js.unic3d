export default /* glsl */`
#ifdef USE_ALPHAMAP

	float alphaTexel;
	if ( alphaMapBlur > 0.0 ) alphaTexel = textureBlurred( alphaMap, vAlphaMapUv, alphaMapBlur ).g;
	else alphaTexel = texture2D( alphaMap, vAlphaMapUv ).g;

	diffuseColor.a *= (alphaTexel - alphaMapLevel.x) / alphaMapLevel.y;

#endif
`;
