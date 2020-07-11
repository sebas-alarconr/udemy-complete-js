import Toastify from 'toastify-js';
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import { DOMElements } from './utils';
import {
  clearInput,
  clearPageButtons,
  clearResults,
  getInput,
  highlightedSelected,
  renderResults,
} from './views/search';
import { renderLoader, clearLoader } from './views/loader';
import {
  clearRecipe,
  renderRecipe,
  updateServingsIngredients,
} from './views/recipe';
import {
  clearList,
  clearEntry,
  deleteItem,
  renderItem,
  toggleRemoveAllButton,
  toggleShoppingList,
} from './views/list';
import {
  toggleLikeButton,
  toggleLikeMenu,
  renderLike,
  deleteLike,
} from './views/likes';

/**
 * Global state object
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};
window.state = state;
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
      Toastify({
        text: error,
        duration: 5000,
        close: true,
        position: 'center',
        backgroundColor: "#EF4041",
        className: 'toastify-error',
      }).showToast();
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
      renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (error) {
      console.log(error);
      clearLoader(parentElement);
      Toastify({
        text: error.number === 404 ? error : 'Oops! There was an error. Sorry :C',
        duration: 5000,
        close: true,
        position: 'center',
        backgroundColor: "#EF4041",
        className: 'toastify-error',
      }).showToast();
    }
  }
};

/*
  List Controller
*/
const controlList = () => {
  if (!state.list) state.list = new List();

  clearList();
  state.list.deleteAll();
  state.recipe.ingredients.forEach(ingredient => {
    const addedItem = state.list.addItem(ingredient.count, ingredient.unit, ingredient.ingredient);
    renderItem(addedItem);
  });
  toggleShoppingList(state.list.getNumberOfItems());
  toggleRemoveAllButton(state.list.getNumberOfItems());
};

/*
  Like Controller
*/
const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const {id, title, author, img} = state.recipe;

  if (!state.likes.isLiked(id)) {
    const createdLike = state.likes.addItem(id, title, author, img);
    toggleLikeButton(true);
    renderLike(createdLike);
  } else {
    state.likes.deleteItem(id);
    toggleLikeButton(false);
    deleteLike(id);
  }

  toggleLikeMenu(state.likes.getNumberOfLikes());
};

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

window.addEventListener('load', () => {
  state.likes = new Likes()
  state.list = new List();
  state.likes.retrieveData();
  state.list.retrieveData();
  toggleLikeMenu(state.likes.getNumberOfLikes());
  toggleRemoveAllButton(state.list.getNumberOfItems());
  toggleShoppingList(state.list.getNumberOfItems());

  state.likes.items.forEach(item => renderLike(item));
  state.list.items.forEach(item => renderItem(item));
});

DOMElements.recipe.addEventListener('click', event => {
  if (event.target.matches('.btn-decrease, .btn-decrease *') && state.recipe.servings > 1) {
    state.recipe.updateServings('dec');
    updateServingsIngredients(state.recipe);
  }

  if (event.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings('inc');
    updateServingsIngredients(state.recipe);
  }

  if (event.target.matches('.recipe__love, .recipe__love *')) {
    controlLike();
  }

  if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    controlList();
  }
});

DOMElements.shoppingList.addEventListener('click', event => {
  const id = event.target.closest('.shopping__item').dataset.id;

  if (event.target.matches('.shopping__delete, .shopping__delete *')){
    state.list.deleteItem(id);
    deleteItem(id);
  }
});

DOMElements.shoppingList.addEventListener('input', event => {
  const id = event.target.closest('.shopping__item').dataset.id;

  if (Number(event.target.value) < 0) event.target.value = 0

  state.list.updateItem(id, Number(event.target.value));

  if (Number(event.target.value) === 0 && confirm('Do you want to remove this item?')) {
    state.list.deleteItem(id);
    deleteItem(id);
  }
});

DOMElements.shoppingRemoveAll.addEventListener('click', () => {
  state.list.deleteAll();
  clearList();
  toggleRemoveAllButton(state.list.getNumberOfItems());
  toggleShoppingList(state.list.getNumberOfItems());
})

DOMElements.shoppingAddElement.addEventListener('click', () => {
  const countValue = Number(DOMElements.shoppingEntryCount.value);
  const unitValue = DOMElements.shoppingEntryUnit.value;
  const ingredientValue = DOMElements.shoppingEntryIngredient.value;

  if (countValue && unitValue && ingredientValue) {
    const addedItem = state.list.addItem(countValue, unitValue, ingredientValue);
    renderItem(addedItem);
    clearEntry();
    toggleShoppingList(state.list.getNumberOfItems());
    toggleRemoveAllButton(state.list.getNumberOfItems());
  }
})