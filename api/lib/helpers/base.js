export default class Base {
  /**
   * Create an instance of the Base class.
   * @param {object} options
   *   The configuration of an instance of Base class.
   * @param {string} options.base
   *   The base URL.
   */
  constructor(options) {
    this.options = Object.assign({
      timeout: 500,
      accessCheck: true,
      validation: true
    }, options);
  }
  /**
   * Set the base url.
   * @param {string} base
   *   The base url.
   */
  setBase(base) {
    this.options.base = base;
  }

  /**
   * Get the base url.
   * @return {string}
   *   The base url.
   */
  getBase() {
    return this.options.base;
  }

};
