import { DOMElements, limitString } from '../utils';

const renderRecipe = recipe => {
  const markup = `
    <li>
      <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitString(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
      </a>
    </li>
  `;

  DOMElements.searchResultsList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (currentPage, type) => `
  <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? currentPage - 1 : currentPage + 1}>
    <span>Page ${type === 'prev' ? currentPage - 1 : currentPage + 1}</span>
    <svg class="search__icon">
      <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
  </button>
`;

const renderButtons = (currentPage, numberOfResults, resultsPerPage) => {
  const pages = Math.ceil(numberOfResults / resultsPerPage);
  let markup = '';

  if (currentPage === 1 && pages > 1) {
    markup = createButton(currentPage, 'next');
  } else if (currentPage < pages) {
    markup = `
      ${createButton(currentPage, 'prev')}
      ${createButton(currentPage, 'next')}
    `;
  } else if (currentPage === pages && pages > 1) {
    markup = createButton(currentPage, 'prev');
  }

  DOMElements.searchResultPages.innerHTML = markup;
};

export const highlightedSelected = id => {
  Array.from(document.querySelectorAll('.results__link')).forEach(link => {
    link.classList.remove('results__link--active');
  });
  document.querySelector(`a[href='#${id}']`).classList.add('results__link--active')
};

export const getInput = () => DOMElements.searchInput.value;

export const clearInput = () => DOMElements.searchInput.value = '';

export const clearResults = () => DOMElements.searchResultsList.innerHTML = '';

export const clearPageButtons = () => DOMElements.searchResultPages.innerHTML = '';

export const renderResults = (recipes, currentPage = 1, resultsPerPage = 10) => {
  const start = (currentPage - 1) * resultsPerPage;
  const end = currentPage * resultsPerPage;

  renderButtons(currentPage, recipes.length, resultsPerPage);
  recipes.slice(start, end).forEach(renderRecipe);
};