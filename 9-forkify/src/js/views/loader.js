const loaderClass = 'loader';

export const renderLoader = parent => {
  const loader = `
    <div class="${loaderClass}">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;

  parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = parent => {
  const loader = parent.querySelector(`.${loaderClass}`);
  if (loader) loader.remove()
};

