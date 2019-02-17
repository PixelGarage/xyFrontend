<template>
  <span class="menu-lang">
    <no-ssr>
      <b-link id="lang_menu">{{locale}}</b-link>
      <b-popover target="lang_menu" placement="bottomcenter" triggers="focus">
          <b-nav vertical justified>
            <b-nav-item v-if="locale !== 'de'" :to="langRoutePath('de')">{{ $t('menu.de-long')}}</b-nav-item>
            <b-nav-item v-if="locale !== 'en'" :to="langRoutePath('en')">{{ $t('menu.en-long')}}</b-nav-item>
            <b-nav-item v-if="locale !== 'fr'" :to="langRoutePath('fr')">{{ $t('menu.fr-long')}}</b-nav-item>
          </b-nav>
      </b-popover>
    </no-ssr>
  </span>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import { mapGetters } from 'vuex'

export default {
  components: {
    'no-ssr': NoSSR,
  },
  computed: {
    ...mapGetters('lang', [
      'locale',
    ]),
  },
  methods: {
    langRoutePath: function (lang) {
      const currentPath = (this.locale === this.$i18n.fallbackLocale) ? 
        this.$route.fullPath : 
        this.$route.fullPath.replace(/^\/[^\/]+/, ''); // strip lang part of path
      return (lang === this.$i18n.fallbackLocale) ? currentPath : `/${lang}${currentPath}`;
    },
  }
}
</script>

<style lang="scss">
  #lang_menu {
    padding: 0.5rem;
  }
</style>


