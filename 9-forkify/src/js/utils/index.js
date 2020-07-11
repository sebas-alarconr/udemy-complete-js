import Fraction from 'fraction.js';

export const DOMElements = {
  searchInput: document.querySelector('.search__field'),
  searchButton: document.querySelector('.search'),
  searchResultsList: document.querySelector('.results__list'),
  searchResults: document.querySelector('.results'),
  searchResultPages: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
  recipeServings: document.querySelector('.recipe__info-data--people'),
  shoppingList: document.querySelector('.shopping__list'),
  likesMenu: document.querySelector('.likes__field'),
  shoppingRemoveAll: document.querySelector('.shopping__btn--remove'),
  shoppingEntryCount: document.querySelector('.shopping__input--entry-count'),
  shoppingEntryUnit: document.querySelector('.shopping__input--entry-unit'),
  shoppingEntryIngredient: document.querySelector('.shopping__input--entry-ingredient'),
  shoppingAddElement: document.querySelector('.shopping__btn--add-element'),
};

export const apiRoutes = {
  search: query => `/search?&q=${query}`,
  get: id => `/get?&rId=${id}`,
};

export const limitString = (string, limit = 17) => {
  const limitedString = [];

  if (string.length > limit) {
    string.split(' ').reduce((accumulator, current) => {
      if (accumulator + current.length <= limit) {
        limitedString.push(current);
      }
      return accumulator + current.length;
    }, 0);

    return `${limitedString.join(' ')}...`;
  }

  return string;
};

export const formatCount = count => {
  if (count) {
    const [int, dec] = count.toString().split('.').map(item => Number(item));

    if (!dec) return count;

    if (int === 0) {
      const fraction = Fraction(count);
      return `${fraction.n}/${fraction.d}`;
    } else {
      const fraction = new Fraction(count - int);
      return `${int} ${fraction.n}/${fraction.d}`;
    }
  }

  return '?';
};