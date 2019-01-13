/**
 * Client for Drupal JSON API
 * This is actually just a thin wrapper around waterwheel.js.
 * We additionnaly use "jsonapi-parse" package to format
 * reponses : it resolves relationships and included objects nicely.
 *
 * Example usage:
 *   const api = new DrupalApiClient(context)
 *   const datas = await api.get('recipes', queryParams)
 */
import Waterwheel from 'waterwheel';
import jsonapiParse from 'jsonapi-parse';

export default class DrupalApiClient {
  /**
   * Creates an instance of the DrupalApiClient class.
   * @param {object} context
   */
  constructor (context) {
    this.context = context;
    this.options = {
      base: context.isDev ? process.env.jsonApiDevServer : process.env.jsonApiProdServer,
      jsonapiPrefix: process.env.jsonApiPrefix,
      timeout: 3000,
      accessCheck: false
    };
    this.waterwheel = new Waterwheel(this.options);
  }

  login (name = '', password = '') {
    if (name && password) {
      let oauthOptions = Object.assign(this.options, {
        accessCheck: true,
        oauth: {
          grant_type: 'password',
          client_id: process.env.clientID,
          client_secret: process.env.clientSecret,
          username: name,
          password: password
        }
      });

      this.waterwheel = new Waterwheel(oauthOptions);
    }
  }

  logout () {
    this.waterwheel = new Waterwheel(this.options);
  }

  async get (uri, queryParams = {}, id = '') {
    const response = await this.waterwheel.jsonapi.get(uri, queryParams, id);
    const data = jsonapiParse.parse(response).data;
    return data;
  }
}
