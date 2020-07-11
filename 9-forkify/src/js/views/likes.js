import { DOMElements, limitString } from '../utils';

export const toggleLikeButton = isLiked => {
  const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';

  document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`)
};

export const toggleLikeMenu = numberOfLikes => {
  DOMElements.likesMenu.style.visibility = numberOfLikes ? 'visible': 'hidden';
  DOMElements.likesMenu.style.opacity = numberOfLikes ? '1': '0';
};

export const deleteLike = id => {
  const item = document.querySelector(`[data-likeid="${id}"]`);
  if (item) item.remove();
};

export const renderLike = like => {
  const markup = `
    <li data-likeid=${like.id}>
      <a class="likes__link" href="#${like.id}">
        <figure class="likes__fig">
          <img src="${like.img}" alt="Test">
        </figure>
        <div class="likes__data">
          <h4 class="likes__name">${limitString(like.title)}</h4>
          <p class="likes__author">${like.author}</p>
        </div>
      </a>
    </li>
  `;

  document.querySelector('.likes__list').insertAdjacentHTML('beforeend', markup);
};