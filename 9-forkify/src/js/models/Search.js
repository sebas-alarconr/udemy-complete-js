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
      console.log(error);
      throw new Error(get(error, 'response.data.error', 'Unknown error.'));
    }
  }
}
