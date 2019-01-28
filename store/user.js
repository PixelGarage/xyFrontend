//
//  Defines the user module in the vuex store.
//
import { DrupalApi, AuthenticationError } from '~/api/DrupalApi.js'

export const state = () => ({
  authenticating: false,
  user: false,
  authErrorCode: 0,
  autErrorMessage: '',
});

export const getters = {
  loggedIn: (state) => {
    return state.user;
  },

  authenticating: (state) => {
    return state.authenticating;
  },

  authErrorCode: (state) => {
      return state.authErrorCode;
  },

  authErrorMessage: (state) => {
      return state.autErrorMessage;
  },

};

export const mutations = {
  loginRequest(state) {
    state.authenticating = true;
    state.autErrorMessage = '';
    state.authErrorCode = 0;
    console.debug('User login request...')
  },

  loginSuccess(state, user) {
      state.user = user;
      state.authenticating = false;
      console.debug('User login successful...')
    },

  loginError(state, {errorCode, errorMessage}) {
      state.authenticating = false;
      state.authErrorCode = errorCode;
      state.autErrorMessage = errorMessage;
      console.debug('User login error occurred: %s', errorMessage)
    },

  logoutSuccess(state) {
      state.user = false;
      console.debug('User logged out...')
    }
};

export const actions = {
  async login({ commit }, {name, password}) {
    commit('loginRequest');
    try {
      const user = await DrupalApi.login(name, password);
      commit('loginSuccess', user);
      return true;
      
    } catch (e) {
      if (e instanceof AuthenticationError) {
        commit('loginError', {errorCode: e.errorCode, errorMessage: e.message});
      }
      return false;
    }
  },

  logout({ commit }) {
    DrupalApi.logout();
    commit('logoutSuccess');
  }
};

