import methods from './methods';
import axios from 'axios';
import qs from 'qs';

// cookie handling client / server
const Cookies = process.client ? require('js-cookie') : undefined;
const CookieParser = process.server ? require('cookieparser') : undefined;

/**
 * OAuth class handling the authentication token
 * in a stateful manner (persistence).
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
      this.removePersistedToken();
      return Promise.reject(e);
    });

    return this.bearerPromise;
  }

  /**
   * Saves or updates the token information in a cookie.
   * The lifetime of the cookie is set via the environment variable 'authTimeout'.
   */
  persistToken () {
    // remove an existing cookie, if any
    // Removing unexisting cookie does not raise any exception nor return any value
    Cookies.remove(process.env.AUTH_COOKIE_NAME);

    // persist the sparse tokenInfo in cookie (only access_token, refresh_token, grant_type)
    let tokenInfo = Object.assign({}, this.tokenInformation);
    delete tokenInfo.client_id;
    delete tokenInfo.client_secret;
    delete tokenInfo.username;
    delete tokenInfo.password;
    // restrict lifetime of cookie when user is inactive
    const inTimeoutSeconds = process.env.AUTH_LIFETIME / 86400;
    Cookies.set(process.env.AUTH_COOKIE_NAME, tokenInfo, { expires: inTimeoutSeconds});
  }

  /**
   * Loads the persisted token universally into memory, if any.
   * 
   * @param {object} req 
   *  The request object, if the method is called on the server, null for client side.
   */
  retrievePersistedToken (req) {
    let tokenInfo = false;

    if (process.client) {
      // read client side cookie (persisted token)
      tokenInfo = Cookies.getJSON(process.env.AUTH_COOKIE_NAME);
    }
    else if (process.server && req && req.headers.cookie) {
      // retrieve cookie from request and read token information
      const parsed = CookieParser.parse(req.headers.cookie)
      try {
        tokenInfo = JSON.parse(parsed[process.env.AUTH_COOKIE_NAME])
      } 
      catch (err) {
        // No valid cookie found
        tokenInfo = false;
      }
    }
    // set the retrieved token, if any
    if (tokenInfo) {
      this.tokenInformation = { client_id: process.env.CLIENT_ID, client_secret: process.env.CLIENT_SECRET };
      this.tokenInformation = Object.assign(this.tokenInformation, tokenInfo);
    }
    else {
      this.tokenInformation = {};
    }
  }

  /**
   * Removes the token information from the persistent storage (cookie).
   */
  removePersistedToken () {
    // remove an existing cookie, if any
    // Removing unexisting cookie does not raise any exception nor return any value
    Cookies.remove(process.env.AUTH_COOKIE_NAME);
  }
};
