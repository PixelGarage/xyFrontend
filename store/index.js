/*
 * Initialize the Drupal API with context
 */
import DrupalApi from '~/api/DrupalApi.js'

export const state = () => ({
  isDev: false,
  basePath: null,
});

export const getters = {
  isDev: (state) => {
    return state.isDev;
  },

  basePath: (state) => {
    return state.basePath;
  },

};

export const mutations = {
  appConfig: (state, context) => {
    state.isDev = context.isDev;
    state.basePath = context.isDev ? context.env.JSON_API_DEVSERVER : context.env.JSON_API_PRODSERVER;
    console.debug('Application configuration set in store...')
  },
};

export const actions = {
  /**
   * Initialises the client with state. 
   */
  nuxtClientInit ({ commit }, context) {
    // init DrupalApi
    DrupalApi.init(context);

    // set application configuration in store
    commit('appConfig', context);
  },

  /** 
   * Initialises the server with state.
   */
  nuxtServerInit ({ commit }, context) {
    // init DrupalApi
    DrupalApi.init(context);
    
    // set application configuration in store
    commit('appConfig', context);
  }
}