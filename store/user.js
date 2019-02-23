//
//  Defines the user module in the vuex store.
//
import { PxlApi, AuthenticationError } from '~/api/PxlApi.js'

export const state = () => ({
  authenticating: false,
  user: false,
  authErrorCode: 0,
  authErrorMessage: '',
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
      return state.authErrorMessage;
  },

};

export const mutations = {
  loginRequest(state) {
    state.authenticating = true;
    state.authErrorMessage = '';
    state.authErrorCode = 0;
    console.debug('User login request...');
  },

  loginSuccess(state, user) {
      state.user = user;
      state.authenticating = false;
      console.debug('User login successful...');
  },

  loginError(state, {errorCode, errorMessage}) {
      state.authenticating = false;
      state.authErrorCode = errorCode;
      state.authErrorMessage = errorMessage;
      console.debug('User login error occurred: %s', errorMessage);
  },

  logoutSuccess(state) {
      state.user = false;
      console.debug('User logged out...');
  }
};

export const actions = {
  /**
   * Login of a user and handling of the user state.
   */
  async login({ commit }, { name, password }) {
    commit('loginRequest');
    try {
      const user = await PxlApi.login(name, password);
      commit('loginSuccess', user);
      return true;
      
    } catch (e) {
      if (e instanceof AuthenticationError) {
        commit('loginError', { errorCode: e.errorCode, errorMessage: e.message });
      }
      else {
        commit('loginError', { errorCode: 400, errorMessage: e.message });
      }
      return false;
    }
  },

  /** 
   * Initialisation of login state (after refresh).
  */
  init ({ commit }, context) {
    // init PxlApi and user store
    PxlApi.init(context);
    if (!PxlApi.loggedIn()) commit('logoutSuccess');
  },

  /**
   * Logout of user.
   */
  logout({ commit }) {
    PxlApi.logout();
    commit('logoutSuccess');
  }
};

