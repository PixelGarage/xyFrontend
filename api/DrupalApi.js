/**
 * DrupalApi class implements the specific asynchronous API-functionality for the application.
 * 
 * DrupalApi is implemented as singleton. This guarantees that a user stays logged in as long as 
 * he stays on the website and his oauth token can be refreshed.
 *
 * Example usage:
 *   const api = new DrupalApi()
 *   api.init(context);
 */
import {DrupalApiClient, AuthenticationError} from './DrupalApiClient';

class DrupalApiImpl extends DrupalApiClient {
  /**
   * Creates the singleton instance of the DrupalApi.
   */
  constructor () {
    super();
    if (!DrupalApiImpl.instance) {
      DrupalApiImpl.instance = this;
    } 
    return DrupalApiImpl.instance;
  }

  /*
   * Define API Interface methods here
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
        files: 'filename,url'
      }
    };
    return await this.get('recipes', query);
  }

}

// holds the singleton instance
const DrupalApi = new DrupalApiImpl();
//Object.freeze(DrupalApi);

export default DrupalApi;

export {DrupalApi, AuthenticationError};