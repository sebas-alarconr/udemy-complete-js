import axios from 'axios';
import { apiRoutes } from '../utils';
import get from 'lodash/get';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getInfo() {
    try {
      const response = await axios(`
        ${process.env.API_URL}${apiRoutes.get(this.id)}
      `);
      const { title, publisher, image_url, source_url, ingredients } = response.data.recipe;
      this.title = title;
      this.author = publisher;
      this.img = image_url;
      this.url = source_url;
      this.ingredients = ingredients;

      this.parseIngredients();
      this.getServings();
      this.getTime();
    } catch (error) {
      console.log(error);
      throw new Error(get(error, 'response.data.error', 'Unknown error.'));
    }
  }

  getTime() {
    // Assuming that we need 15min for each 3 ingredients
    const numberOfIngredients = this.ingredients.length;
    const periods = Math.ceil(numberOfIngredients / 3);
    this.time = periods * 15;
  }

  getServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    const units = [...unitsShort, 'kg', 'g'];
    const newIngredients = this.ingredients.map(currentIngredient => {
      let objIngredient;
      let ingredient = currentIngredient.toLowerCase();
      unitsLong.forEach((unit, index) => {
        ingredient = ingredient.replace(unit, units[index]);
      });

      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      const arrayIngredient = ingredient.split(' ');
      const unitIndex = arrayIngredient.findIndex(ingr => units.includes(ingr));

      if (unitIndex > -1) {
        const arrayCount = arrayIngredient.slice(0, unitIndex);
        let count;

        if (arrayCount.length === 1) {
          count = eval(arrayIngredient[0].replace('-', '+'));
        } else {
          count = eval(arrayIngredient.slice(0, unitIndex).join('+'));
        }

        objIngredient = {
          count,
          unit: arrayIngredient[unitIndex],
          ingredient: arrayIngredient.slice(unitIndex + 1).join(' ')
        };
      } else if (Number(arrayIngredient[0])) {
        objIngredient = {
          count: Number(arrayIngredient[0]),
          unit: '',
          ingredient: arrayIngredient.slice(1).join(' ')
        };
      } else if (unitIndex === -1) {
        objIngredient = {
          count: 1,
          unit: '',
          ingredient
        };
      }

      // Making sure count is not undefined
      objIngredient = {
        ...objIngredient,
        count: objIngredient.count ? objIngredient.count : 1,
      };

      return objIngredient;
    });

    this.ingredients = newIngredients;
  }
}