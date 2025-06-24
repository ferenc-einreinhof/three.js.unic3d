export default /* glsl */`
#ifdef USE_DETAIL_NORMALMAP

	uniform sampler2D detailNormalMap;
	uniform float detailNormalScale;
  uniform float detailNormalAO;

#endif
`;
