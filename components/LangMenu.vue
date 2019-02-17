<template>
  <span class="menu-lang">
    <no-ssr>
      <b-link id="lang_menu">{{locale}}</b-link>
      <b-popover target="lang_menu" placement="bottomcenter" triggers="focus">
          <b-nav vertical justified>
            <b-nav-item :to="routePath('de')">{{ $t('menu.de-long')}}</b-nav-item>
            <b-nav-item :to="routePath('en')">{{ $t('menu.en-long')}}</b-nav-item>
            <b-nav-item :to="routePath('fr')">{{ $t('menu.fr-long')}}</b-nav-item>
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
    routePath: function (locale) {
      return locale === this.$store.state.lang.fallbackLocale ? this.$route.fullPath : `/${locale}${this.$route.fullPath.replace(/^\/[^\/]+/, '')}`;
    },
  }
}
</script>

<style lang="scss">
  #lang_menu {
    padding: 0.5rem;
  }
</style>


