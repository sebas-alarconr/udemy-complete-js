export const DOMElements = {
  searchInput: document.querySelector('.search__field'),
  searchButton: document.querySelector('.search'),
  searchResultsList: document.querySelector('.results__list'),
  searchResults: document.querySelector('.results'),
  searchResultPages: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
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
