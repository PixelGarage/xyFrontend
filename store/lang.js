/**
 * Holds the language state of the application.
 */

export const state = () => ({
  locales: ['de', 'en', 'fr'],
  locale: 'de',
})

export const getters = {
  locale: (state) => {
    return state.locale;
  },
}

export const mutations = {
  setLanguage(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
      console.debug('New language set to %s', locale);
    }
  }
}
