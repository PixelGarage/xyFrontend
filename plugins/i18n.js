import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VeeValidate from 'vee-validate'
import validationMessagesDe from 'vee-validate/dist/locale/de'
import validationMessagesEn from 'vee-validate/dist/locale/en'
import validationMessagesFr from 'vee-validate/dist/locale/fr'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'de',
  fallbackLocale: 'de',
  messages: {
    'de': require('~/locales/de.json'),
    'en': require('~/locales/en.json'),
    'fr': require('~/locales/fr.json'),
  }
});

Vue.use(VeeValidate, {
  i18nRootKey: 'validations', // customize the root path for validation messages.
  i18n,
  dictionary: {
    de: validationMessagesDe,
    en: validationMessagesEn,
    fr: validationMessagesFr
  }
});

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  i18n.locale = store.state.lang.locale;
  app.i18n = i18n;

  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }
    // add language to path if default language is not selected
    return `/${app.i18n.locale}/${link}`
  }
}
