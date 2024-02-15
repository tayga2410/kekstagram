import {showPopup} from './popup.js';
import initScaleControl from './scale-control.js';
import initEffectSlider from './effect-slider.js';

const popup = document.querySelector('.img-upload__overlay');
const preview = popup.querySelector('img');
const scaleControl = initScaleControl(popup.querySelector('.scale'));
const effectSlider = initEffectSlider(popup.querySelector('.effect-level'));
const effectPicker = popup.querySelector('.effects');

/**
 * @param {File} data
 */
function renderPopup(data) {
  setPreviewUrl(URL.createObjectURL(data));

  scaleControl.on('update', onScaleControlUpdate);
  scaleControl.setValue(100);

  effectSlider.on('update', onEffectSliderUpdate);
  effectSlider.setEffect('none');

  effectPicker.addEventListener('change', onEffectPickerChange);

  showPopup(popup);
}

/**
 *
 * @param {string} url
 */
function setPreviewUrl(url) {
  preview.setAttribute('src', url);

  effectPicker.querySelectorAll('span').forEach((it) => {
    it.style.setProperty('background-image', `url(${url})`);
  });
}

function onScaleControlUpdate() {
  const percent = scaleControl.getValue();
  const ratio = percent / 100;

  preview.style.setProperty('transform', `scale(${ratio})`);
}

function onEffectSliderUpdate() {
  preview.style.setProperty('filter', effectSlider.getCssValue());
}

function onEffectPickerChange(event) {
  effectSlider.setEffect(event.target.getAttribute('value'));
}

export default renderPopup;
