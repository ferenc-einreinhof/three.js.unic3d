export default /* glsl */`
#ifdef USE_MAP

	vec4 sampledDiffuseColor = texture2D( map, vMapUv );

	sampledDiffuseColor.rgb = (mix(vec3(dot(sampledDiffuseColor.rgb, vec3(0.2125, 0.7154, 0.0721))), sampledDiffuseColor.rgb, mapSaturation) - vec3(mapLevel.x)) / vec3(mapLevel.y);

	#ifdef DECODE_VIDEO_TEXTURE

		// use inline sRGB decode until browsers properly support SRGB8_ALPHA8 with video textures (#26516)

		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );

	#endif

	diffuseColor *= sampledDiffuseColor;

#endif
`;
