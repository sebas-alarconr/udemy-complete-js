import { DOMElements } from '../utils';

export const clearList = () => {
  DOMElements.shoppingList.innerHTML = '';
}

export const renderItem = item => {
  // IMO having a step of 0.5 makes more sense
  const markup = `
    <li class="shopping__item" data-id=${item.id}>
      <div class="shopping__count">
        <input type="number" value="${item.count}" step="0.5" class="shopping__count-value">
        <p>${item.unit}</p>
      </div>
      <p class="shopping__description">${item.ingredient}</p>
      <button class="shopping__delete btn-tiny">
        <svg>
          <use href="img/icons.svg#icon-circle-with-cross"></use>
        </svg>
      </button>
    </li>
  `;

  DOMElements.shoppingList.insertAdjacentHTML('beforeend', markup);
};

export const deleteItem = id => {
  const item = document.querySelector(`[data-id="${id}"]`);
  if (item) item.remove();
};

export const toggleRemoveAllButton = numberOfItems => {
  DOMElements.shoppingRemoveAll.style.visibility = numberOfItems ? 'visible': 'hidden';
  DOMElements.shoppingRemoveAll.style.opacity = numberOfItems ? '1': '0';
}

export const toggleShoppingList = numberOfItems => {
  DOMElements.shoppingList.style.visibility = numberOfItems ? 'visible': 'hidden';
  DOMElements.shoppingList.style.opacity = numberOfItems ? '1': '0';
}

export const clearEntry = () => {
  DOMElements.shoppingEntryCount.value = 0;
  DOMElements.shoppingEntryUnit.value = '';
  DOMElements.shoppingEntryIngredient.value = '';
}