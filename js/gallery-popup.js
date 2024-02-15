import {showPopup} from './popup.js';

/**
 * @type {ReturnType<createCommentsRenderer>}
 */
let renderNextComments;

const popup = document.querySelector('.big-picture');
const commentTemplate = popup.querySelector('.social__comment');

/**
 * @param {Picture} data
 */
function renderPopup(data) {
  popup.querySelector('.big-picture__img img').setAttribute('src', data.url);
  popup.querySelector('.social__caption').textContent = data.description;
  popup.querySelector('.likes-count').textContent = String(data.likes);

  renderNextComments = createCommentsRenderer(data.comments);
  renderNextComments();
  popup.addEventListener('click', onPopupClick);

  showPopup(popup);
}

/**
 *
 * @param {MouseEvent & {target: Element}} event
 */
function onPopupClick(event) {
  if (event.target.closest('.comments-loader')){
    renderNextComments();
  }
}

/**
 * @param {Array<PictureComment>} data
 */
function createCommentsRenderer(data, step = 5) {
  const discussion = popup.querySelector('.social__comments');
  const loadMoreButton = popup.querySelector('.comments-loader');
  const[shownCount, totalCount] = popup.querySelectorAll ('.comments-count');
  const commentsTotal = data.length;

  data = structuredClone(data);
  discussion.replaceChildren();
  totalCount.textContent = String(commentsTotal);

  return () => {
    discussion.append(...data.splice(0, step).map(createComment));
    loadMoreButton.classList.toggle('hidden', data.length === 0);
    shownCount.textContent = String(commentsTotal - data.length);
  };
}

/**
 * @param {PictureComment} data
 * @returns {HTMLLIElement}
 */
function createComment(data) {
  const comment = /** @type {HTMLLIElement} */ (commentTemplate.cloneNode(true));

  comment.querySelector('.social__picture').setAttribute('src', data.avatar);
  comment.querySelector('.social__picture').setAttribute('alt', data.name);
  comment.querySelector('.social__text').textContent = data.message;

  return comment;
}

export default renderPopup;
