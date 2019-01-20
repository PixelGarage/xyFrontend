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
import jsonapiParse from 'jsonapi-parse';

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
    this.context = {};
    this.options = {
      base: process.env.jsonApiProdServer,
      jsonapiPrefix: process.env.jsonApiPrefix,
      validation: false,
      timeout: 3000,
    };
    this.waterwheel = new Waterwheel(this.options);
  }

  /**
   * Initialize the instance of the DrupalApiClient.
   * 
   * @param {object} context The nuxt context.
   */
  init (context) {
    // only init once
    if (this.context.env) return;

    // init the API client
    Object.assign(this.context, context);
    if (context.isDev) {
      this.options.base = process.env.jsonApiDevServer;
      this.waterwheel.setBase(process.env.jsonApiDevServer);
      this.waterwheel.oauth.basePath = process.env.jsonApiDevServer;
      this.waterwheel.request.setBase(process.env.jsonApiDevServer);
    }
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
    console.assert(this.context.env, 'DrupalAPI: The context is not initialized');

    if (name && password) {
      let oauthOptions = {
          grant_type: 'password',
          client_id: process.env.clientID,
          client_secret: process.env.clientSecret,
          username: name,
          password: password
        };
      // create a new Waterwheel instance with the oauth credentials
      this.waterwheel.oauth.tokenInformation = Object.assign({}, oauthOptions);
      this.options.validation = true;
      this.waterwheel.request.options.validation = true;

      // get the specific user
      let user = null;
      try {
        const queryParams = {};
        const response = await this.waterwheel.jsonapi.get('users', queryParams);
        user = jsonapiParse.parse(response).data;
      } 
      catch (e) {
        const status = e.status ? e.status : 400;
        throw new AuthenticationError(status, `User login failed with status ${status}: ${e.message}`);
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
    this.waterwheel.oauth.tokenInformation = {};
    this.options.validation = false;
    this.waterwheel.request.options.validation = false;
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
    console.assert(this.context.env, 'DrupalAPI: The context is not initialized');

    const response = await this.waterwheel.jsonapi.get(uri, queryParams, id);
    const data = jsonapiParse.parse(response).data;
    return data;
  }

  /**
   * HTTP POST request method in JsonApi format.
   * This request sends data to the server and results in a change on the server (not idempotent). 
   * @param {string} uri
   *   The relative path to fetch from the API.
   * @param  {object} body
   *   JSON data sent to Drupal
   * @return {promise}
   *   Resolves when the request is fulfilled, rejects if there's an error.
   */
  async post (uri, body) {
    console.assert(this.context.env, 'DrupalAPI: The context is not initialized');

    const response = await this.waterwheel.jsonapi.post(uri, body);
    const data = jsonapiParse.parse(response).data;
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
    console.assert(this.context.env, 'DrupalAPI: The context is not initialized');

    const response = await this.waterwheel.jsonapi.patch(uri, body);
    const data = jsonapiParse.parse(response).data;
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
    console.assert(this.context.env, 'DrupalAPI: The context is not initialized');

    const response = await this.waterwheel.jsonapi.delete(uri, id);
    const data = jsonapiParse.parse(response).data;
    return data;
  }
}

export default DrupalApiClient;

export {DrupalApiClient, AuthenticationError};
