/**
 * @param {Element} target
 * @returns {EffectSlider}
 */
function initEffectSlider(target) {
  // @ts-ignore
  const slider = noUiSlider.create(target.querySelector('div'), createOptions());
  const level = target.querySelector('input');

  slider.on('update', onSliderUpdate);

  function onSliderUpdate() {
    level.setAttribute('value', slider.get(true));
  }

  /**
   * @param {EffectType} type
   */
  function setEffect(type) {
    slider.updateOptions(createOptions(type));
    target.classList.toggle('hidden', type === 'none');
  }

  /**
   * @returns {string}
   */
  function getCssValue() {
    return slider.get();
  }

  /**
   * @param {string} type
   * @param {() => void} listener
   */
  function on(type, listener) {
    slider.on(type, listener);
  }

  return {setEffect, getCssValue, on};
}

/**
 * @param {EffectType} type
 */
function createOptions(type = 'none') {
  /**
   * @type {Record<EffectType, Array<number>>}
   */
  const effectRangeMap = {
    none: [0, 100, 1],
    chrome: [0, 1, .1],
    sepia: [0, 1, .1],
    marvin: [0, 100, 1],
    phobos: [0, 3, .1],
    heat: [1, 3, .1]
  };

  /**
   * @type {Record<EffectType, (value: number) => string>}
   */
  const effectFormatterMap = {
    none: () => '',
    chrome: (value) => `grayscale(${value})`,
    sepia: (value) => `sepia(${value})`,
    marvin: (value) => `invert(${value}%)`,
    phobos: (value) => `blur(${value}px)`,
    heat: (value) => `brightness(${value})`
  };

  const [min, max, step] = effectRangeMap[type];
  const format = {
    to: effectFormatterMap[type],
    from: Number
  };

  return {
    range: {min, max},
    step,
    start: max,
    format,
    behaviour: 'snap',
    connect: 'lower'
  };
}

export default initEffectSlider;
