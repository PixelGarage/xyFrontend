/**
 * PxlApi class implements the specific asynchronous API-functionality for the application.
 * 
 * Example usage:
 *   const api = new PxlApi()
 *   api.init(context);
 */
import { PxlApiClient, AuthenticationError } from './PxlApiClient';

class PxlApiInst extends PxlApiClient {
  /**
   * Holds the one and only instance.
   */
  static instance = false;

  /**
   * Creates the singleton instance of the PxlApi.
   */
  constructor () {
    super();
    if (!this.instance) {
      this.instance = this;
    } 
    return this.instance;
  }

  /*
   * Define Pixel API methods here
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
const PxlApi = new PxlApiInst();
Object.freeze(PxlApi);

//
// exports
export default PxlApi;
export { PxlApi, AuthenticationError };