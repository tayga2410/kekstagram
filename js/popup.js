/**
 * @param {Element} popup
 */
function showPopup(popup) {
  popup.classList.remove('hidden');
  popup.scroll(0, 0);
  popup.addEventListener('click', onPopupClick);

  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

/**
 * @param {Element} popup
 */
function hidePopup(popup) {
  popup.classList.add('hidden');
  popup.removeEventListener('click', onPopupClick);
  popup.dispatchEvent(new Event('hide'));

  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

/**
 * @param {MouseEvent & {target: Element, currentTarget: Element}} event
 */
function onPopupClick(event) {
  if (event.target.closest('.cancel')) {
    hidePopup(event.currentTarget);
  }
}

/**
 * @param {KeyboardEvent & {target: Element}} event
 */
function onDocumentKeydown(event) {
  const isEscapeKey = event.key.startsWith('Esc');
  const isTextField = event.target.matches('input[type="text"], textarea');

  if (isEscapeKey && !isTextField) {
    hidePopup(document.querySelector('.overlay:not(.hidden)'));
  }
}

export {showPopup, hidePopup};
