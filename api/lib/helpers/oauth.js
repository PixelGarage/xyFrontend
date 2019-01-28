import methods from './methods';
import axios from 'axios';
import qs from 'qs';
// cookie handling client / server
const Cookies = process.client ? require('js-cookie') : undefined;
const CookieParser = process.server ? require('cookieparser') : undefined;
const cookieName = 'tokenInfo';

/**
 * OAuth class handling the authentication token.
 */
export default class OAuth {
  constructor(basePath, OAuthOptions) {
    this.basePath = basePath;
    this.tokenInformation = Object.assign({}, OAuthOptions);
    this.tokenInformation.grant_type = 'password';
  }
  /**
   * Get an OAuth Token.
   * @return {promise}
   *   The resolved promise of fetching the oauth token.
   */
  getToken() {
    const currentTime = new Date().getTime();
    // Resolve if token already exists and is fresh
    if (this.tokenInformation.access_token && (
      this.hasOwnProperty('tokenExpireTime') &&
      this.tokenExpireTime > currentTime
    )) {
      return Promise.resolve();
    }
    // If token is already being fetched, use that one.
    else if (this.bearerPromise) {
      return this.bearerPromise;
    }
    // If token has already been fetched switch grant_type to refresh_token.
    else if (this.tokenInformation.access_token) {
      this.tokenInformation.grant_type = 'refresh_token'; // eslint-disable-line camelcase
    }

    this.bearerPromise = axios({
      method: methods.post,
      url: `${this.basePath}/oauth/token`,
      data: qs.stringify(this.tokenInformation)
    })
    .then(response => {
      delete this.bearerPromise;
      let t = new Date();
      t.setSeconds(+t.getSeconds() + response.data.expires_in);
      this.tokenExpireTime = t.getTime();
      Object.assign(this.tokenInformation, response.data);
      this.persistToken();
      return response.data;
    })
    .catch(e => {
      delete this.bearerPromise;
      return Promise.reject(e);
    });

    return this.bearerPromise;
  }

  /**
   * Saves or updates the token information in a cookie.
   */
  persistToken () {
    // remove an existing cookie, if any
    // Removing unexisting cookie does not raise any exception nor return any value
    Cookies.remove(cookieName);

    // persist the new token
    Cookies.set(cookieName, this.tokenInformation);
  }

  /**
   * Loads the persisted token into memory, if any.
   */
  retrievePersistedToken () {
    // read cookie and set token information (persistent token)
    const tokenInfo = Cookies.getJSON(cookieName);
    if (tokenInfo) {
      this.tokenInformation = Object.assign({}, tokenInfo);
    }
  }

  /**
   * Removes the token information from the persistent storage (cookie).
   */
  removePersistedToken () {
    // remove an existing cookie, if any
    // Removing unexisting cookie does not raise any exception nor return any value
    Cookies.remove(cookieName);
  }
};
