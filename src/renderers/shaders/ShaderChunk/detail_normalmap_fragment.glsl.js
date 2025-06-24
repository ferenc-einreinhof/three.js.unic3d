export default /* glsl */`

#ifdef USE_DETAIL_NORMALMAP
	vec4 texelDetailNormal = texture2D( detailNormalMap, vDetailNormalMapUv );

  #ifdef USE_NORMALMAP_OBJECTSPACE
    normal = normalize( normal + normalMatrix * texelDetailNormal.xyz );
  #else
    vec3 dMapN = texelDetailNormal.xyz * 2.0 - 1.0;
    dMapN.xy *= detailNormalScale;
	  normal = normalize( normal + tbn * dMapN );
  #endif

  diffuseColor.rgb *= texelDetailNormal.a;
#endif
`;
