import axios from 'axios';
import { apiRoutes } from '../utils';
import get from 'lodash/get';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getSearchResults() {
    try {
      const response = await axios(`
        ${process.env.API_URL}${apiRoutes.search(this.query)}
      `);

      this.results = response.data.recipes;
    } catch (error) {
      console.log(error.response);
      const myError = new Error(get(error, 'response.data.error', 'Oops! There was an error. Sorry :C'));
      myError.number = get(error, 'response.status', -1);
      throw myError;
    }
  }
}
