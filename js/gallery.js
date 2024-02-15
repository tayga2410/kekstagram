import renderPopup from './gallery-popup.js';
import { throttle } from './utils.js';

/**
 * @type {HTMLTemplateElement}
 */
const thumbnailTemplate = document.querySelector('#picture');
const gallery = document.querySelector('.pictures');
const menu = document.querySelector('.img-filters');

/**
 * @param {Array<Picture>} data
 */
function initGallery(data) {
  const filter = createFilter(data);

  menu.classList.remove('img-filters--inactive');
  menu.addEventListener('click', onMenuClick);
  menu.addEventListener('toggle', throttle ((event) => {
    const selectedButton = /** @type {HTMLButtonElement}*/ (event.target);
    const selectedValue = /** @type {FilterType}*/ (selectedButton.getAttribute('value'));

    renderThumbnails(filter(selectedValue));
  }), true);

  renderThumbnails(data);
}

/**
 *
 * @param {Array<Picture>} data
 * @param {{randomLimit?: number}} options
 * @returns {(type: FilterType) => Array<Picture>}
 */
function createFilter (data, options = {}) {
  const {randomLimit = 10} = options;

  return (type) => {
    const items = structuredClone(data);

    if (type === 'random') {
      return items.sort(() => Math.random() - .5).slice(0, randomLimit);
    }
    if (type === 'discussed') {
      return items.sort((a, b) => b.comments.length - a.comments.length);
    }
    return items;

  };
}
/**
 *
 * @param {MouseEvent & {target: Element}} event
 */
function onMenuClick(event) {
  const selectedButton = event.target.closest('button');

  if (selectedButton) {
    menu.querySelectorAll('button').forEach((button) => {
      button.classList.toggle('img-filters__button--active', button === selectedButton);
    });
    selectedButton.dispatchEvent(new Event('toggle'));

  }
}

/**
 * @param {Array<Picture>} data
 */
function renderThumbnails(data) {
  gallery.querySelectorAll('.picture').forEach((it) => it.remove());
  gallery.append(...data.map(createThumbnail));
}

/**
 * @param {Picture} data
 * @returns {HTMLAnchorElement}
 */
function createThumbnail(data) {
  const thumbnail = /** @type {HTMLAnchorElement} */ (
    thumbnailTemplate.content.querySelector('.picture').cloneNode(true)
  );

  thumbnail.querySelector('.picture__img').setAttribute('src', data.url);
  thumbnail.querySelector('.picture__img').setAttribute('alt', data.description);
  thumbnail.querySelector('.picture__comments').textContent = String(data.comments.length);
  thumbnail.querySelector('.picture__likes').textContent = String(data.likes);

  thumbnail.addEventListener('click', (event)=> {
    renderPopup(data);
    event.preventDefault();
  });

  return thumbnail;
}

export default initGallery;
