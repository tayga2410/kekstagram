/**
 * @param {Element} target
 * @param {ScaleControlOptions} options
 * @returns {ScaleControl}
 */
function initScaleControl(target, options = {}) {
  const input = target.querySelector('input');
  const [stepDownButton, stepUpButton] = target.querySelectorAll('button');
  const {min = 25, max = 100, step = 25} = options;

  stepDownButton.addEventListener('click', onStepDownButtonClick);
  stepUpButton.addEventListener('click', onStepUpButtonClick);

  function onStepDownButtonClick() {
    setValue(getValue() - step);
  }

  function onStepUpButtonClick() {
    setValue(getValue() + step);
  }

  /**
   * @returns {number}
   */
  function getValue() {
    return Number.parseFloat(input.getAttribute('value'));
  }

  /**
   * @param {number} percent
   */
  function setValue(percent) {
    percent = Math.max(percent, min);
    percent = Math.min(percent, max);

    input.setAttribute('value', `${percent}%`);
    input.dispatchEvent(new Event('update'));
  }

  /**
   * @param {string} type
   * @param {EventListener} listener
   */
  function on(type, listener) {
    input.addEventListener(type, listener);
  }

  return {getValue, setValue, on};
}

export default initScaleControl;
