import Search from './models/Search';
import Recipe from './models/Recipe';
import { DOMElements } from './utils';
import {
  clearInput,
  clearPageButtons,
  clearResults,
  getInput,
  highlightedSelected,
  renderResults,
} from './views/searchView';
import { renderLoader, clearLoader } from './views/loader';
import { clearRecipe, renderRecipe } from './views/recipeView';

/**
 * Global state object
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/*
  Search Controller
*/
const controlSearch = async () => {
  const query = getInput();

  if (query) {
    const parentElement = DOMElements.searchResults;
    state.search = new Search(query);

    clearInput();
    clearResults();
    clearPageButtons();

    renderLoader(parentElement);

    try {
      await state.search.getSearchResults();

      clearLoader(parentElement);
      renderResults(state.search.results);
    } catch (error) {
      clearLoader(parentElement);
      alert(error);
    }
  }
};

/*
  Recipe Controller
*/

const controlRecipe = async () => {
  const id = window.location.hash.replace('#', '');

  if (id) {
    const parentElement = DOMElements.recipe;
    if (state.search) highlightedSelected(id);
    state.recipe = new Recipe(id);

    clearRecipe();

    renderLoader(parentElement);

    try {
      await state.recipe.getInfo();

      clearLoader(parentElement);
      renderRecipe(state.recipe);
    } catch (error) {
      console.log(error);
      clearLoader(parentElement);
      alert(error);
    }
  }
}

/*
  Event Listeners
*/
DOMElements.searchButton.addEventListener('submit', event => {
  event.preventDefault();
  controlSearch();
});

DOMElements.searchResultPages.addEventListener('click', event => {
  const paginationButton = event.target.closest('.btn-inline');

  if (paginationButton) {
    const goTo = Number(paginationButton.dataset.goto);
    clearResults();
    renderResults(state.search.results, goTo);
  }
});

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));