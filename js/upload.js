import renderPopup from './upload-popup.js';
import './pristine-validators.js';

import './pristine-validators.js';
import { request } from './utils.js';

import renderStatus from './status.js';

/**
 * @type {HTMLFormElement}
 */
const form = document.querySelector('.img-upload__form');

// @ts-ignore
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

form.addEventListener('change', onFormChange);
form.addEventListener('hide', onFormHide, true);
form.addEventListener('reset', onFormReset);
form.addEventListener('submit', onFormSubmit);

/**
 * @param {Event & {target: HTMLInputElement}} event
 */
function onFormChange(event) {
  if (event.target.matches('#upload-file')) {
    const [data] = event.target.files;
    const types = event.target.getAttribute('accept').split(', ');

    if(types.some((it) => data.name.endsWith(it))) {
      renderPopup(data);

    } else {
      const title = 'неподдерживаемый формат';
      const button = 'попробовать другой файл';

      renderStatus('error', {title, button});
      form.reset();

    }

  }
}
function onFormHide() {
  form.reset();
}

function onFormReset() {
  pristine.reset();
}

async function sendFormData() {
  const url = form.getAttribute('action');
  const method = form.getAttribute('method');
  const body = new FormData(form);

  await request(url, {method, body});
}

/**
 *
 * @param {SubmitEvent} event
 */
async function onFormSubmit(event) {
  event.preventDefault();

  if(!pristine.validate()){
    return;
  }

  try {
    setSubmitBlocking(true);
    await sendFormData();
    resetFormAndHidePopup();
    renderStatus('success');
  } catch {
    renderStatus('error');
  } finally {
    setSubmitBlocking(false);
  }

}

/**
 *
 * @param {boolean} flag
 */
function setSubmitBlocking(flag) {
  form['upload-submit'].toggleAttribute('disabled', flag);
}

function resetFormAndHidePopup() {
  form['upload-cancel'].click();
}
