/*******************************************************************************
* Async JS
*******************************************************************************/
/*
const second = () => {
  setTimeout(() => {
    console.log('Async text')
  }, 2000)
}
const first = () => {
  console.log('Hey there');
  second();
  console.log('The end')
}

first();
*/

/*******************************************************************************
* Event loop

Is in charge of monitoring constantly the Message Queue and the Execution Stack.
As soon as the Ex. Stack is empty, the Event Loop pushes the first callback
function in line on to of the Execution Stack
*******************************************************************************/

/*******************************************************************************
* The old way and Callback hell
*******************************************************************************/
/*
function getRecipe () {
  setTimeout(() => {
    const recipeID = [523, 883, 432, 974];
    console.log(recipeID);

    setTimeout(id => {
      const recipe = {
        title: 'Fresh tomato pasta',
        publisher: 'Jonas',
      }

      console.log(`${id} recipe: ${recipe.title} published by ${recipe.publisher}`);

      setTimeout(publisher => {
        const recipe = {
          title: 'Italian Pizza',
          publisher: 'Jonas',
        }

        console.log(`Recipe: ${recipe.title} published by ${publisher}`);
      }, 1500, recipe.publisher)
    }, 1000, recipeID[2]);
  }, 1500);
}

getRecipe();
*/

/*******************************************************************************
* Promises
*******************************************************************************/
/*
  - Object that keeps track about whether a certain event has happened already
  or not.
  - Determines what happens after the event has happened.
  - Implements the concept of a future vale that we're expecting.

  States:

  Pending -> Event Happens -> Settled / Resolved
                          Fulfilled ╝ ╚ Rejected
*/
/*
const recipes = [
  {
    id: 523,
    name: 'Fresh tomato pasta',
    publisher: 'Jonas',
  },
  {
    id: 883,
    name: 'Italian Pizza',
    publisher: 'Jonas',
  },
  {
    id: 432,
    name: 'Burger',
    publisher: 'Emily',
  },
  {
    id: 974,
    name: 'Hot dog',
    publisher: 'Mark',
  }
];

const getIDs = new Promise((resolve, reject) => {
  setTimeout(() => {
    const recipeID = [523, 883, 432, 974];

    // Random fail if we get 0 just to see how reject works
    if (Math.floor(Math.random() *  6) > 0) {
      resolve(recipeID);
    } else {
      reject('Failed getting ids');
    }
  }, 1500);
});

const getRecipeById = recipeId => {
  return new Promise((resolve, reject) => {
    setTimeout(id => {
      const foundRecipe = recipes.find((recipe) => recipe.id === id);

      if (foundRecipe) {
        resolve(foundRecipe);
      } else {
        reject('Recipe not found');
      }
    }, 2000, recipeId)
  });
}

const getRecipesByPublisher = publisher => {
  return new Promise((resolve, reject) => {
    setTimeout(name => {
      const foundRecipes = recipes.filter((recipe) => recipe.publisher === name);

      if (foundRecipes.length) {
        resolve(foundRecipes);
      } else {
        reject(`There was an error getting the recipes`);
      }
    }, 1000, publisher)
  });
}

getIDs
  .then(ids => {
    // Could be a non-existing index, to make it fail on purpose sometimes
    const randomIndex = Math.floor(Math.random() *  (ids.length + 2));

    return getRecipeById(ids[randomIndex]);
  })
  .then(recipe => {
    console.log('We found a recipe');
    console.log(recipe);
    let publisher = recipe.publisher;

    // Random fail if we get 0 or 1 just to see how reject works
    if (Math.floor(Math.random() *  6) < 2) {
      publisher = 'Non-Existing publisher';
    }

    return getRecipesByPublisher(publisher);
  })
  .then(recipesByPublisher => {
    console.log('All recipes from the same publisher:');
    console.log(recipesByPublisher);
  })
  .catch(error => {
    console.log(error);
  });
*/

/*******************************************************************************
* Async / Await
*******************************************************************************/
/*
const recipes = [
  {
    id: 523,
    name: 'Fresh tomato pasta',
    publisher: 'Jonas',
  },
  {
    id: 883,
    name: 'Italian Pizza',
    publisher: 'Jonas',
  },
  {
    id: 432,
    name: 'Burger',
    publisher: 'Emily',
  },
  {
    id: 974,
    name: 'Hot dog',
    publisher: 'Mark',
  }
];

const getIDs = new Promise((resolve, reject) => {
  setTimeout(() => {
    const recipeID = [523, 883, 432, 974];

    // Random fail if we get 0 just to see how reject works
    if (Math.floor(Math.random() *  6) > 0) {
      resolve(recipeID);
    } else {
      reject('Failed getting ids');
    }
  }, 1500);
});

const getRecipeById = recipeId => {
  return new Promise((resolve, reject) => {
    setTimeout(id => {
      const foundRecipe = recipes.find((recipe) => recipe.id === id);

      if (foundRecipe) {
        resolve(foundRecipe);
      } else {
        reject('Recipe not found');
      }
    }, 2000, recipeId)
  });
}

const getRecipesByPublisher = publisher => {
  return new Promise((resolve, reject) => {
    setTimeout(name => {
      const foundRecipes = recipes.filter((recipe) => recipe.publisher === name);

      if (foundRecipes.length) {
        resolve(foundRecipes);
      } else {
        reject(`There was an error getting the recipes`);
      }
    }, 1000, publisher)
  });
}

async function getRecipesAsync() {
  try {
    const ids = await getIDs;
    const randomIndex = Math.floor(Math.random() *  (ids.length + 2));
    const recipe = await getRecipeById(ids[randomIndex]);
    console.log('We found a recipe');
    console.log(recipe);
    let publisher = recipe.publisher;

    // Random fail if we get 0 or 1 just to see how reject works
    if (Math.floor(Math.random() *  6) < 2) {
      publisher = 'Non-Existing publisher';
    }

    const recipesByPublisher = await getRecipesByPublisher(publisher);
    console.log('All recipes from the same publisher:');
    console.log(recipesByPublisher);

    return recipesByPublisher;
  } catch (error) {
    console.log(error);
  }
}

getRecipesAsync();
*/

/*******************************************************************************
* AJAX, APIs, fetch and async/await
*******************************************************************************/

/*
  AJAX (Asynchronous Javascript And XML)
    Allows us to asynchronously communicate with remote services

  API (Application Programming Interface)
    A piece of software that can be used by software and allows apps to
    communicate each other


    C    HTTP Req (Get, Post, Put, Delete)
    L ══════════════════════════════════════> A
    I                                         P
    E <══════════════════════════════════════ I
    N                 Response
    T
*/
/*
function getTodayWeather(woeid) {
  fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)
    .then(response => response.json())
    .then(data => {
      const today = data.consolidated_weather[0];
      console.log(`Today in ${data.title} will be between ${today.min_temp}°C and ${today.max_temp}°C`);
    })
    .catch(err => console.log(err));
}

async function getTodayWeatherAsync(woeid) {
  try {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)
    const data = await response.json();
    const today = data.consolidated_weather[0];
    const tomorrow = data.consolidated_weather[0];
    console.log(`Today in ${data.title} will be between ${today.min_temp}°C and ${today.max_temp}°C`);
    console.log(`Tomorrow in ${data.title} will be between ${tomorrow.min_temp}°C and ${tomorrow.max_temp}°C`);

    return data;
  } catch (error) {
    console.log(error)
  }
}
let londonData;
getTodayWeather(2487956);
getTodayWeatherAsync(44418)
  .then(data => {
    londonData = data;
    console.log(londonData);
  });
*/