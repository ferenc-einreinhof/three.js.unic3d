import { Object3D } from '../core/Object3D.js';
import { Euler } from '../math/Euler.js';
import { Color } from '../math/Color.js';
import { Fog } from './Fog.js';

/**
 * Scenes allow you to set up what is to be rendered and where by three.js.
 * This is where you place 3D objects like meshes, lines or lights.
 *
 * @augments Object3D
 */
class Scene extends Object3D {

	/**
	 * Constructs a new scene.
	 */
	constructor() {

		super();

		/**
		 * This flag can be used for type testing.
		 *
		 * @type {boolean}
		 * @readonly
		 * @default true
		 */
		this.isScene = true;

		this.type = 'Scene';

		/**
		 * Defines the background of the scene. Valid inputs are:
		 *
		 * - A color for defining a uniform colored background.
		 * - A texture for defining a (flat) textured background.
		 * - Cube textures or equirectangular textures for defining a skybox.
		 *
		 * @type {?(Color|Texture)}
		 * @default null
		 */
		this.background = null;

		/**
		 * Sets the environment map for all physical materials in the scene. However,
		 * it's not possible to overwrite an existing texture assigned to the `envMap`
		 * material property.
		 *
		 * @type {?Texture}
		 * @default null
		 */
		this.environment = null;

		/**
		 * A fog instance defining the type of fog that affects everything
		 * rendered in the scene.
		 *
		 * @type {?(Fog|FogExp2)}
		 * @default null
		 */
		// this.fog = null;

		/**
		 * Sets the blurriness of the background. Only influences environment maps
		 * assigned to {@link Scene#background}. Valid input is a float between `0`
		 * and `1`.
		 *
		 * @type {number}
		 * @default 0
		 */
		this.backgroundBlurriness = 0;

		/**
		 * Attenuates the color of the background. Only applies to background textures.
		 *
		 * @type {number}
		 * @default 1
		 */
		this.backgroundIntensity = 1;

		/**
		 * The rotation of the background in radians. Only influences environment maps
		 * assigned to {@link Scene#background}.
		 *
		 * @type {Euler}
		 * @default (0,0,0)
		 */
		this.backgroundRotation = new Euler();

		/**
		 * Attenuates the color of the environment. Only influences environment maps
		 * assigned to {@link Scene#environment}.
		 *
		 * @type {number}
		 * @default 1
		 */
		this.environmentIntensity = 1;

		/**
		 * The rotation of the environment map in radians. Only influences physical materials
		 * in the scene when {@link Scene#environment} is used.
		 *
		 * @type {Euler}
		 * @default (0,0,0)
		 */
		this.environmentRotation = new Euler();

		/**
		 * Forces everything in the scene to be rendered with the defined material. It is possible
		 * to exclude materials from override by setting {@link Material#allowOverride} to `false`.
		 *
		 * @type {?Material}
		 * @default null
		 */
		this.overrideMaterial = null;

		this.environmentIntensity = 1;
		this.environmentDiffuseMultiplier = 1;
		// this.environmentRotationOffset = 0;
		this.aoMapIntensity = 1;

		if (!('fog' in this)) this.fog = null;

		if ( typeof __THREE_DEVTOOLS__ !== 'undefined' ) {

			__THREE_DEVTOOLS__.dispatchEvent( new CustomEvent( 'observe', { detail: this } ) );

		}

	}

	get fogDistanceMin() { return this._fog_near ?? 1; }
	set fogDistanceMin(v) { this.setFogParam('near', v); }
	get fogDistanceMax() { return this._fog_far ?? 1000; }
	set fogDistanceMax(v) { this.setFogParam('far', v); }
	get fogColor() {
		return this._fog_color ?? 0;
	}
	set fogColor(v) {
		if (v instanceof Color) v = v.getHex();
		this._fog_color = v;
		if (this.fog) this.fog.color.setHex(v);
	}
	get fogType() { return this._fogType ?? 'none'; }
	set fogType(v) {
		this._fogType = v;
		if (!v || v === 'none') {
			this.fog = null;
		} else {
			this.fog = new Fog(this._fogColor ?? 0, this._fogDistanceMin ?? 1, this._fogDistanceMax ?? 1000);
		}
	}

	setFogParam(prop, val) {
		this['_fog_'+prop] = val;
		if (this.fog) {
			this.fog[prop] = val;
		}
	}

	copy( source, recursive ) {

		super.copy( source, recursive );

		if ( source.background !== null ) this.background = source.background.clone();
		if ( source.environment !== null ) this.environment = source.environment.clone();
		if ( source.fog !== null ) this.fog = source.fog.clone();

		this.backgroundBlurriness = source.backgroundBlurriness;
		this.backgroundIntensity = source.backgroundIntensity;
		this.backgroundRotation.copy( source.backgroundRotation );

		this.environmentIntensity = source.environmentIntensity;
		this.environmentRotation.copy( source.environmentRotation );

		if ( source.overrideMaterial !== null ) this.overrideMaterial = source.overrideMaterial.clone();

		this.matrixAutoUpdate = source.matrixAutoUpdate;

		this.environmentIntensity = source.environmentIntensity;
		this.environmentDiffuseMultiplier = source.environmentDiffuseMultiplier;
		// this.environmentRotationOffset = source.environmentRotationOffset;
		this.aoMapIntensity = source.aoMapIntensity;
		this.fogType = source.fogType;
		this.fogColor = source.fogColor;
		this.fogDistanceMin = source.fogDistanceMin;
		this.fogDistanceMax = source.fogDistanceMax;      

		return this;

	}

	toJSON( meta ) {

		const data = super.toJSON( meta );

		if ( this.fog !== null ) data.object.fog = this.fog.toJSON();

		if ( this.backgroundBlurriness > 0 ) data.object.backgroundBlurriness = this.backgroundBlurriness;
		if ( this.backgroundIntensity !== 1 ) data.object.backgroundIntensity = this.backgroundIntensity;
		data.object.backgroundRotation = this.backgroundRotation.toArray();

		if ( this.environmentIntensity !== 1 ) data.object.environmentIntensity = this.environmentIntensity;
		data.object.environmentRotation = this.environmentRotation.toArray();

		data.object.environmentIntensity = this.environmentIntensity;
		data.object.environmentDiffuseMultiplier = this.environmentDiffuseMultiplier;
		// data.object.environmentRotationOffset = this.environmentRotationOffset;
		data.object.aoMapIntensity = this.aoMapIntensity;
		data.object.fogType = this.fogType;
		data.object.fogColor = this.fogColor;
		data.object.fogDistanceMin = this.fogDistanceMin;
		data.object.fogDistanceMax = this.fogDistanceMax;   

		return data;

	}

}

export { Scene };
