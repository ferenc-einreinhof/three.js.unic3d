export default /* glsl */`
float roughnessFactor = roughness;

#ifdef USE_COLOR_ROUGHNESS_FACTOR
	roughnessFactor += dot(diffuseColor.xyz, roughnessColorFactor);
#endif

#ifdef USE_ROUGHNESSMAP

	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );

	// reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	roughnessFactor *= (texelRoughness.g - roughnessMapLevel.x) / roughnessMapLevel.y;

#endif

#ifdef USE_ROUGHNESS_OFFSET
	roughnessFactor = clamp(roughnessFactor+roughnessOffset.x, 0.0, 1.0)+roughnessOffset.y;
#endif
`;
