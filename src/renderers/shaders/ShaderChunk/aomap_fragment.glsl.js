export default /* glsl */`
#ifdef USE_AOMAP

	// reads channel R, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	vec4 textVal = texture2D( aoMap, vAoMapUv );
	float val = (mix(textVal.r, textVal.a, aoMapFade) - aoMapLevel.x) / aoMapLevel.y;

	float ambientOcclusion = ( val - 1.0 ) * aoMapIntensity + 1.0;

	reflectedLight.indirectDiffuse *= ambientOcclusion;

	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif

	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif

	#if defined( USE_ENVMAP ) && defined( STANDARD )

		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );

		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );

	#endif

#endif
`;
