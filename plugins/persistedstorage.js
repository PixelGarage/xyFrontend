import createPersistedState from 'vuex-persistedstate'
 
/**
 * A client side plugin to persist selected store paths in the session.
 */
export default ({store}) => {
  createPersistedState({
    key: 'vuex',
    paths: ['lang', 'user'],
    storage: window.sessionStorage,
  })(store);
}
