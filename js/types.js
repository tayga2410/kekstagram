/**
 * @typedef Picture
 * @prop {number} id
 * @prop {string} url
 * @prop {string} description
 * @prop {number} likes
 * @prop {Array<PictureComment>} comments
 */

/**
 * @typedef PictureComment
 * @prop {number} id
 * @prop {string} avatar
 * @prop {string} message
 * @prop {string} name
 */

/**
 * @typedef ScaleControl
 * @prop {() => number} getValue
 * @prop {(percent: number) => void} setValue
 * @prop {(type: string, listener: EventListener) => void} on
 */

/**
 * @typedef ScaleControlOptions
 * @prop {number} [min]
 * @prop {number} [max]
 * @prop {number} [step]
 */

/**
 * @typedef EffectSlider
 * @prop {(type: EffectType) => void} setEffect
 * @prop {() => string} getCssValue
 * @prop {(type: string, listener: () => void) => void} on
 */

/**
 * @typedef {'none' | 'chrome' | 'sepia' | 'marvin' | 'phobos' | 'heat'} EffectType
 */

/**
 * @typedef {'success' | 'error'} StatusType
 */

/**
 * @typedef StatusOptions
 * @prop {String} [title]
 * @prop {string} [button]
 */

/**
 * @typedef {'default' | 'random' | 'discussed'} FilterType
 */
