export default /* glsl */`
#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

	#if defined( USE_POINTS_UV )

		vec2 uv = vUv;

	#else

		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;

	#endif

#endif

#ifdef USE_MAP

	vec4 mapTexel = texture2D( map, uv ); 
	mapTexel.rgb = (mix(vec3(dot(mapTexel.rgb, vec3(0.2125, 0.7154, 0.0721))), mapTexel.rgb, mapSaturation) - vec3(mapLevel.x)) / vec3(mapLevel.y);

	diffuseColor *= mapTexel;

#endif

#ifdef USE_ALPHAMAP

	diffuseColor.a *= (texture2D( alphaMap, uv ).g - alphaMapLevel.x) / alphaMapLevel.y;

#endif
`;
