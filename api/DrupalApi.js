/**
 * DrupalApi class implements the specific asynchronous API-functionality for the application.
 * 
 * Example usage:
 *   const api = new DrupalApi()
 *   api.init(context);
 */
import { DrupalApiClient, AuthenticationError } from './DrupalApiClient';

class DrupalApiInst extends DrupalApiClient {
  /**
   * Holds the one and only instance.
   */
  static instance = false;

  /**
   * Creates the singleton instance of the DrupalApi.
   */
  constructor () {
    super();
    if (!this.instance) {
      this.instance = this;
    } 
    return this.instance;
  }

  /*
   * Define Drupal API methods here
   */
  async findAllLatestRecipes (limit = 4, offset = 0) {
    const query = {
      sort: '-created',
      page: {
        limit
      },
      include: 'image,image.thumbnail',
      fields: {
        recipes: 'title,difficulty,image',
        images: 'name,thumbnail',
        files: 'filename,uri'
      }
    };
    return await this.get('recipes', query);
  }

}

// create singleton and protect against change
const DrupalApi = new DrupalApiInst();
Object.freeze(DrupalApi);

//
// exports
export default DrupalApi;
export { DrupalApi, AuthenticationError };