<template>
  <span class="menu-lang">
    <no-ssr>
      <b-link id="lang_menu">{{ $t('comp.lang-menu.title') }}</b-link>
      <b-popover class="popover" target="lang_menu" placement="bottomcenter" triggers="focus">
          <b-nav class="popover__nav" vertical justified>
            <b-nav-item class="popover__nav-item" v-if="locale !== 'de'" :to="langRoutePath('de')">{{ $t('comp.lang-menu.de-long')}}</b-nav-item>
            <b-nav-item class="popover__nav-item" v-if="locale !== 'en'" :to="langRoutePath('en')">{{ $t('comp.lang-menu.en-long')}}</b-nav-item>
            <b-nav-item class="popover__nav-item" v-if="locale !== 'fr'" :to="langRoutePath('fr')">{{ $t('comp.lang-menu.fr-long')}}</b-nav-item>
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
  @import "~/assets/scss/component.scss";

  #lang_menu {
    padding: 0.5rem;
  }

  .popover {
    .popover__nav {
      .popover__nav-item {
        a {
          @include pxl-menutext();
          outline: none;
          color: $link-color;
          text-decoration: $link-decoration;

          @include hover-focus-active {
            outline: none;
            color: $link-hover-color;
            text-decoration: $link-hover-decoration;
          }
        }
      }
    }
  }
</style>


