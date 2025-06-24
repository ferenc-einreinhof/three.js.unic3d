export default /* glsl */`
#ifdef USE_ALPHAMAP

	diffuseColor.a *= (texture2D( alphaMap, vAlphaMapUv ).g - alphaMapLevel.x) / alphaMapLevel.y;

#endif
`;
