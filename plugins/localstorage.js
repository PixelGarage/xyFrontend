import createPersistedState from 'vuex-persistedstate'
 
export default ({store}) => {
  createPersistedState({
    key: 'vuex',
    paths: ['user'],
    storage: window.sessionStorage,
  })(store);
}
