/**
 * Client for Drupal JSON API
 * This is actually just a thin wrapper around waterwheel.js.
 * Additionally use "jsonapi-parse" package to format
 * reponses : it resolves relationships and included objects nicely.
 *
 * Example usage:
 *   const api = new DrupalApiClient(context)
 *   const datas = await api.get('recipes', queryParams)
 */
import Waterwheel from './lib/waterwheel';
import JsonapiParse from 'jsonapi-parse';
// cookie handling client / server
const Cookies = process.client ? require('js-cookie') : undefined;
const CookieParser = process.server ? require('cookieparser') : undefined;



/*
 * AuthenticationError class.
 *
 * Implements a specific authentication error.
 */
class AuthenticationError extends Error {
  constructor(errorCode, message) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.errorCode = errorCode
  }
}

/*
 * Drupal Api client.
 *
 * Implements the JsonApi Rest interface to the Drupal server including 
 * an OAuth standardized API authorisation.
 */
class DrupalApiClient {
  /**
   * Creates an instance of the DrupalApiClient class.
   */
  constructor () {
    this.options = {
      base: false,
      jsonapiPrefix: process.env.jsonApiPrefix,
      validation: false,
      timeout: 3000,
    };
    this.waterwheel = new Waterwheel(this.options);
  }

  /**
   * Initializes the Drupal Api instance with the nuxt context on client side.
   * 
   * @param {object} context 
   */
  init(context) {
    // Set the base bath
    const basePath = context.isDev ? context.env.jsonApiDevServer : context.env.jsonApiProdServer;
    this.waterwheel.setBase(basePath);
    this.waterwheel.oauth.basePath = basePath;
    this.waterwheel.request.setBase(basePath);

    // set persisted token information, if any
    this.waterwheel.oauth.retrievePersistedToken();
  }

  /**
   * Login of a user with username and password.
   * After a successful login a promise with the user object is returned.
   * All further requests are performed with the given user permission (via token).
   * 
   * @param {string} name
   *   The user name.
   * @param {string} password
   *   The user password.
   * @return {promise}
   *   Resolves with the user object as result, when the request is fulfilled.
   *   Rejects if there's an error.
   */
  async login (name, password) {
    console.assert(this.waterwheel.getBase(), 'DrupalApi: The API is not initialized.');

    if (name && password) {
      const oauthOptions = {
        grant_type: 'password',
        client_id: process.env.clientID,
        client_secret: process.env.clientSecret,
        username: name,
        password: password
      };
      // set the oauth credentials
      this.waterwheel.setCredentials(oauthOptions);

      // authenticate user and get user data needed on client
      let user = null;
      try {
        const queryParams = {
          include: 'user_picture',
          filter: {
            user: {
              path: 'name',
              value: name
            }
          }
        };
        const response = await this.waterwheel.jsonapi.get('users', queryParams);
        user = JsonapiParse.parse(response).data[0];
      } 
      catch (error) {
        const status = error.status ? error.status : 400;
        throw new AuthenticationError(status, `User login failed with status ${status}: ${error.message}`);
      }
      finally {
        // delete password for safety reason (token available) and return user
        delete this.waterwheel.oauth.tokenInformation.password;
      }
      return user;
    }
  }

  /**
   * Logout of the current user.
   */
  logout () {
    // reset the oauth credentials to autonomous.
    this.waterwheel.setCredentials(false);
  }

  /**
   * HTTP GET request method in JsonApi format.
   * This requests a representation of the specified resource.
   * 
   * @param {string} uri
   *   The relative path to fetch from the API.
   * @param {object} queryParams
   *   Optional: GET arguments to send with the request.
   * @param {string} id
   *   Optional: An ID of an individual item to request.
   * @return {promise}
   *   Resolves when the request is fulfilled, rejects if there's an error.
   */
  async get (uri, queryParams = {}, id = '') {
    console.assert(this.waterwheel.getBase(), 'DrupalApi: The API is not initialized.');
    
    const response = await this.waterwheel.jsonapi.get(uri, queryParams, id);
    const data = JsonapiParse.parse(response).data;
    return data;
  }

  /**
   * HTTP POST request method in JsonApi format.
   * This request sends data to the server and results in a change on the server (not idempotent).
   * 
   * @param {string} uri
   *   The relative path to fetch from the API.
   * @param  {object} body
   *   JSON data sent to Drupal
   * @return {promise}
   *   Resolves when the request is fulfilled, rejects if there's an error.
   */
  async post (uri, body) {
    console.assert(this.waterwheel.getBase(), 'DrupalApi: The API is not initialized.');
    
    const response = await this.waterwheel.jsonapi.post(uri, body);
    const data = JsonapiParse.parse(response).data;
    return data;
  }

  /**
   * HTTP PATCH request method in JsonApi format. 
   * This request applies partial modifications to a resource.
   * 
   * @param {string} uri
   *   The relative path to fetch from the API.
   * @param  {object} body
   *   JSON data sent to Drupal
   * @return {promise}
   *   Resolves when the request is fulfilled, rejects if there's an error.
   */
  async patch(uri, body) {
    console.assert(this.waterwheel.getBase(), 'DrupalApi: The API is not initialized.');
    
    const response = await this.waterwheel.jsonapi.patch(uri, body);
    const data = JsonapiParse.parse(response).data;
    return data;
  }

  /**
   * HTTP DELETE request method in JsonApi format. 
   * This request deletes the specified resource
   *
  * @param {string} uri
   *   The relative path to fetch from the API.
   * @param {string} id
   *   An ID of an individual item to delete.
   * @return {promise}
   *   Resolves when the request is fulfilled, rejects if there's an error.
 */
  async delete(uri, id) {
    console.assert(this.waterwheel.getBase(), 'DrupalApi: The API is not initialized.');
    
    const response = await this.waterwheel.jsonapi.delete(uri, id);
    const data = JsonapiParse.parse(response).data;
    return data;
  }
}

//
// exports
export default DrupalApiClient;
export { DrupalApiClient, AuthenticationError };
