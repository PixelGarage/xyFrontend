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
    state.basePath = context.isDev ? context.env.jsonApiDevServer : context.env.jsonApiProdServer;
    console.debug('Application configuration set in store...')
  },
};

export const actions = {
  nuxtClientInit ({ commit }, context) {
    // init DrupalApi
    DrupalApi.init(context);

    // set application configuration in store
    commit('appConfig', context);
  },

  nuxtServerInit ({ commit }, context) {
    // init DrupalApi
    DrupalApi.init(context);
    
    // set application configuration in store
    commit('appConfig', context);
  }
}