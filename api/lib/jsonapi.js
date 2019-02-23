import methods from './helpers/methods';
import qs from 'qs';
import JsonapiParse from 'jsonapi-parse';


export default class JSONAPI {
  constructor(options, request) {
    this.request = request;
    this.jsonapiPrefix = options.jsonapiPrefix || 'jsonapi';
    this.useJsonapiSpec = options.useJsonapiSpec || true;
  }

  /**
   * GET jsonapi
   *
   * @param {string} resource
   *   The relative path to fetch from the API.
   * @param {object} params
   *   GET arguments to send with the request.
   * @param {string} id
   *   An ID of an individual item to request.
   * @return {promise}
   *   Resolves when the request is fulfilled, rejects if there's an error.
 */
  async get(resource, params, id = false) {
    const url = `/${this.jsonapiPrefix}/${resource}${id ? `/${id}` : ''}${Object.keys(params).length ? `?${qs.stringify(params, {indices: false})}` : ''}`;
    const response = await this.request.issueRequest(methods.get, url);
    return this.useJsonapiSpec ? JsonapiParse.parse(response).data : JSON.parse(response);
  }

  /**
   * POST jsonapi
   *
   * Security (Cross-site request forgery):
   * In order to protect itself from CSRF attacks, a POST first requests a X-CSRF-Token 
   * from the server, which is added to the request header when issuing the POST request.
   * 
   * @param {string} resource
   *   The relative path to resource to be posted.
   * @param  {object} body
   *   JSON data sent to Drupal
   * @param {boolean} useXCSRF
   *   True if request has to be XCSRF protected.
   * @return {promise}
   *   Resolves when the request is fulfilled, rejects if there's an error.
   */
  async post(resource, body, useXCSRF = false) {
    const response = await (useXCSRF ?
      this.request.getXCSRFToken() :
      Promise.resolve()
    )
    .then(() => {
      return this.request.issueRequest(
        methods.post,
        `/${this.jsonapiPrefix}/${resource}`,
        {
          'Content-Type': this.useJsonapiSpec ? 'application/vnd.api+json' : 'application/json'
        },
        body
      );
    });
    return this.useJsonapiSpec ? JsonapiParse.parse(response).data : JSON.parse(response);
  }

  /**
   * PATCH jsonapi
   *
   * Security (Cross-site request forgery):
   * In order to protect itself from CSRF attacks, a PATCH first requests a X-CSRF-Token 
   * from the server, which is added to the request header when issuing the PATCH request.
   * 
   * @param {string} resource
   *   The relative path to resource to be patched.
   * @param  {object} body
   *   JSON data sent to Drupal
   * @param {boolean} useXCSRF
   *   True if request has to be XCSRF protected.
   * @return {promise}
   *   Resolves when the request is fulfilled, rejects if there's an error.
   */
  async patch(resource, body, useXCSRF = false) {
    const response = await (useXCSRF ?
      this.request.getXCSRFToken() :
      Promise.resolve()
    )
    .then(() => {
      return this.request.issueRequest(
        methods.patch,
        `/${this.jsonapiPrefix}/${resource}`,
        {
          'Content-Type': this.useJsonapiSpec ? 'application/vnd.api+json' : 'application/json'
        },
        body
      );
    });
    // return parsed object
    return this.useJsonapiSpec ? JsonapiParse.parse(response).data : JSON.parse(response);
  }

  /**
   * DELETE jsonapi
   *
   * Security (Cross-site request forgery):
   * In order to protect itself from CSRF attacks, a DELETE first requests a X-CSRF-Token 
   * from the server, which is added to the request header when issuing the DELETE request.
   * 
   * @param {string} resource
   *   The relative path to resource to be deleted.
   * @param {string} id
   *   An ID of an individual item to delete.
   * @param {boolean} useXCSRF
   *   True if request has to be XCSRF protected.
   * @return {promise}
   *   Resolves when the request is fulfilled, rejects if there's an error.
   */
  async delete(resource, id, useXCSRF = false) {
    const response = await (useXCSRF ?
      this.request.getXCSRFToken() :
      Promise.resolve()
    )
    .then(() => {
      const url = `/${this.jsonapiPrefix}/${resource}/${id}`;
      return this.request.issueRequest(
        methods.delete,
        url,
        {
          'Content-Type': this.useJsonapiSpec ? 'application/vnd.api+json' : 'application/json'
        }
      );
    });
    // return parsed object
    return this.useJsonapiSpec ? JsonapiParse.parse(response).data : JSON.parse(response);
  }

};
