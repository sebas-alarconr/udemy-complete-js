# Forkify App
An app to search, watch and save recipes using an external [API](https://forkify-api.herokuapp.com/)

## Motivation
Build a JS app to apply the concepts saw in Sections [7](../7-ES6/script.js) and [8](../8-asynchronous-JS/script.js)

## Base Features (made with the videos / author)
- Config manually Webpack and babel
- Using node / npm
- Search Recipe
- Pagination on results
- View/Get Recipe using hash change in URL
- Parsing units in ingredients to standardize them
- Parsing amount of ingredients to show them as fractions
- Increase/Decrease number of servings and calculate amount of ingredients
- Add ingredients to shopping list
- Delete ingredients from shopping list
- Likes menu to save liked recipes
- localStorage persistence of Liked recipes

## Extended Features (developed/implemented by me)
- Using `.env` file to read environmental variables (such as API URL), allowing this through Webpack config.
- Using [yarn](https://yarnpkg.com/) as package manager.
- Using [nvm](https://github.com/nvm-sh/nvm) as Node Version Manager
- Allowing the user not only to use the 'step' feature of the input but also typing any number
- Validating input in shopping list `count` field to avoid negative numbers.
- When the input `count` is 0, the app is asking if the user wants to delete that ingredient from the shopping list.
- Improving showing/hiding likes menu and shopping list with `opacity` attribute and transitions to make them smoother.
- localStorage persistence of Shopping list items.
- Changing the package to show the fractions, using now [fraction.js](https://github.com/infusion/Fraction.js/).
- Improving errors management and the way to display them. Using [Toastify](https://github.com/apvarun/toastify-js) to show any kind of notifications. Only showing specific errors when is an API error.
- Using a [utils files](utils/index.js) to have things like:

  - DOMElements
  - apiRoutes
  - limitString
  - formatCount

- Using `loader` as a separate vie/component to make the app more modular.
- Renaming all views to avoid calling all of them 'View'.
- Adding a 'Remove all' functionality for Shopping List.
- Allowing the user to add manually an ingredient to the shopping list.


## How to run
- Node version used: 13.x.x and use your favorite package manager.
- Install dependencies

  `npm install`

  or

  `yarn install`

- Create a `.env` file with the `API_URL` property

- Run the app

  `npm start`

  or

  `yarn start`
  
