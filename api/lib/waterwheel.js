import Base from './helpers/base';

import Request from './helpers/request';
import Entity from './entity';
import JSONAPI from './jsonapi';
import Swagger from './swagger';
import OAuth from './helpers/oauth';
import methods from './helpers/methods';

export default class Waterwheel extends Base {
  /**
   * Create an instance of the Waterwheel class.
   * @param {object} options
   *   The configuration used to create a new instance of Waterwheel.
   * @param {string} options.base
   *   The base URL.
   * @param {object} options.oauth
   *   The credentials used with each request.
   * @param {string} options.oauth.grant_type
   *   The type of grant you are requesting.
   * @param {string} options.oauth.client_id
   *   The ID of the OAuth Client.
   * @param {string} options.oauth.client_secret
   *   The secret set when the Client was created.
   * @param {string} options.oauth.username
   *   The resource owner username.
   * @param {string} options.oauth.password
   *   The resource owner password.
   * @param {string} options.oauth.scope
   *   The scope of the access request.
   * @param {string} options.timeout
   *   How long AXIOS should wait before bailing on a request (ms).
   * @param {string} options.jsonapiPrefix
   *   If you have overridden the JSON API prefix, specify it here and Waterwheel
   *   will use this over the default of 'jsonapi'.
   * @param {boolean} options.useJsonapiSpec
   *   True, if the content follows the JSON:API specification V1.0 (Mime type=application/vnd.api+json), 
   *   otherwise normal JSON content (Mime type=application/json) is expected. Default: true
   * @param {boolean} options.validation
   *   Should the request use oauth validation or expect anonymous access.
   */
  constructor(options) {
    super(options);
    this.api = {};

    this.oauth = new OAuth(this.options.base, this.options.oauth);
    this.request = new Request(options, this.oauth);

    this.jsonapi = new JSONAPI(options, this.request);

    if (this.options.resources && Object.keys(this.options.resources).length) {
      this.parseSwagger(this.options.resources, this.request);
    }
  }

  /**
   * Manages the credentials of a user.
   * If oauthOpt is set with all credentials, the user is logged in with the next Api call.
   * If oauthOpt is set to null or false, the user is logged out. 
   *
   * @param {object} oauthOpt
   *   The credentials used with each request or null to be reset.
   * @param {string} oauthOpt.grant_type
   *   The type of grant you are requesting.
   * @param {string} oauthOpt.client_id
   *   The ID of the oauthOpt Client.
   * @param {string} oauthOpt.client_secret
   *   The secret set when the Client was created.
   * @param {string} oauthOpt.username
   *   The resource owner username.
   * @param {string} oauthOpt.password
   *   The resource owner password.
   * @param {string} oauthOpt.scope
   *   The scope of the access request.
  */
  setCredentials(oauthOpt) {
    if (oauthOpt) {
      this.request.options.validation = true;
      this.oauth.tokenInformation = Object.assign({}, oauthOpt);
      this.oauth.tokenInformation.grant_type = 'password'; // only 'password' grant type supported yet
    }
    else {
      this.request.options.validation = false;
      this.oauth.tokenInformation = {};
      this.oauth.removePersistedToken();
    }
  }

  /**
   * Parse a Swagger compatible document and create Waterwheel entities.
   * @param {object} swaggerResources
   *   A JSON object representing your API in Swagger format.
   * @param {object} request
   *   A shared requestor class instance.
   * @param {object} credentials
   *   A credentials object for making requests.
   */
  parseSwagger(swaggerResources, request) {
    let swagger = new Swagger(swaggerResources).collectEntities();

    Object.keys(swagger).forEach(entity => {
      let methods = {};
      Object.keys(swagger[entity].methods).forEach(method => {
        methods[method] = {
          path: swagger[entity].methods[method].path
        };
      });
      this.api[entity] = new Entity({
        base: this.options.base,
        methods: methods,
        bundle: entity.indexOf(':') > -1 ? entity.split(':')[1] : entity,
        entity: entity.indexOf(':') > -1 ? entity.split(':')[0] : entity,
        metadata: {
          requiredFields: swagger[entity].requiredFields,
          properties: swagger[entity].properties
        }
      }, request);
    });
  }

  /**
   * Return an array of resources currently active in Waterwheel.
   * @return {array}
   *   The resources currently active in Waterwheel.
   */
  getAvailableResources(){
    // Sort everything for readability.
    return Object.keys(this.api).sort();
  }

  /**
   * Populate Waterwheel.api with available resources from a Swagger endpoint.
   * @param {string} resourcesLocation
   *   The full HTTP path for your swagger resources.
   * @return {Promise}
   *   A completed promise after the requested resources were added.
   */
  populateResources(resourcesLocation) {
    return this.request.issueRequest(methods.get, resourcesLocation, {}, false, false)
      .then(res => {
        this.parseSwagger(res, this.request);
      });
  }

  /**
   * Fetch embedded resources from HAL+JSON documents
   * @param  {object} entityJSON
   *   An object, usually returned from Drupal, containing _embedded information
   * @param {string|array} [includedFields]
   *  If specified, a series of embedded resources to fetch.
   * @return {Promise}
   *   If no _embedded key is found, a rejection is returned, else a resolved
   *   promise with all the embedded resources requests completed.
   */
  fetchEmbedded(entityJSON, includedFields) {
    if (!entityJSON || !entityJSON.hasOwnProperty('_embedded')) {
      return Promise.reject('This is probably not HAL+JSON');
    }

    const fieldsToFilterBy = includedFields ?
      (Array.isArray(includedFields) ? includedFields : [includedFields]) : false;

    const embeddedResources = entityJSON._embedded;
    const embeddedResourcesKeys = Object.keys(embeddedResources);

    let links = [];

    (fieldsToFilterBy ?
      embeddedResourcesKeys.filter(key => fieldsToFilterBy.indexOf(key.split('/').pop()) !== -1) :
      embeddedResourcesKeys
    ).forEach(key => {
      embeddedResources[key].forEach(ref => {
        links.push(ref._links.self.href.split(this.options.base)[1]);
      });
    });

    // Create a Set from the possibly-duplicate links array.
    // Get an array from that set.
    links = Array.from(new Set(links));

    // Promise.all accepts an array of promises to resolve. The first item
    // in this array is the original entity, adjacent to the embedded ones.
    return Promise.all([Promise.resolve(entityJSON)].concat(links.map(link => this.request.issueRequest(methods.get, link))));
  }

};
