export default /* glsl */`

#ifdef USE_DETAIL_NORMALMAP
  float dmAO = 1.0 - (1.0 - dot(vec3(0,0,1), texelDetailNormal.xyz)) * detailNormalAO;

	reflectedLight.indirectDiffuse *= dmAO;

	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= dmAO;
	#endif

	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= dmAO;
	#endif

	#if defined( USE_ENVMAP ) && defined( STANDARD )

		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );

		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, dmAO, material.roughness );

	#endif

#endif
`;
