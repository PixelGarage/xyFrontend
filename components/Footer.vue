<script>
  import { mapGetters } from 'vuex'
  import Verein from '~/content/verein.md'
  import Logo from '~/components/Logo'
  import Follow from '~/components/controls/Follow'
  import { faFacebookF, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

  export default {
    components: {
      Verein, Logo, Follow,
    },
    props: {
      fluid: Boolean
    },
    data () {
      return {
        text_verein: Verein,
        facebook: faFacebookF,
        twitter: faTwitter,
        youtube: faYoutube,
      }
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
          this.$route.fullPath.replace(/^\/[^\/]+/, ''); // strip language part of path
        return (lang === this.$i18n.fallbackLocale) ? currentPath : `/${lang}${currentPath}`;
      },
    }
  }
</script>

<template>
  <footer class="footer">
    <b-container class="footer__container" v-bind:fluid="fluid">
      <b-row>
        <b-col class="footer__col-menu col col-12 col-lg-3">
          <div class="footer__nav-list">
            <b-link class="footer__nav-item" :to="$i18n.path('test/api-test')">{{ $t('header.menu.api-test') }}</b-link>
            <b-link class="footer__nav-item" :to="$i18n.path('test/form-elements')">{{ $t('header.menu.form-elements') }}</b-link>
            <b-link class="footer__nav-item" :to="$i18n.path('test/typography')">{{ $t('header.menu.typography') }}</b-link>
            <b-link class="footer__nav-item" :to="$i18n.path('test/grid-spacing')">{{ $t('header.menu.grid-spacing') }}</b-link>
            <b-link class="footer__nav-item" :to="$i18n.path('contact')">{{ $t('header.menu.contact') }}</b-link>
            <b-link class="footer__nav-item" :to="$i18n.path('impressum')">{{ $t('footer.impressum') }}</b-link>
            <b-link class="footer__nav-item" :to="$i18n.path('data-protection')">{{ $t('footer.data-protection') }}</b-link>
          </div>
        </b-col>
        <b-col class="footer__col-lang col col-12 col-lg-3">
          <div class="footer__nav-list">
            <b-link class="footer__nav-item" :to="langRoutePath('de')">{{ $t('comp.lang-menu.de-long') }}</b-link>
            <b-link class="footer__nav-item" :to="langRoutePath('en')">{{ $t('comp.lang-menu.en-long') }}</b-link>
            <Follow orientation="horizontal" buttonSize="small"/>
          </div>
        </b-col>
        <b-col class="col col-12 col-lg-6 order-lg-first">
          <Logo/>
          <h4 class="footer__header">{{ $t('footer.header') }}</h4>
          <div class="footer__association" v-html="text_verein"></div>
        </b-col>
      </b-row>
    </b-container>
  </footer>

</template>

<style lang="scss">
/*
 * AppFooter rules
 * --------------------------------------------------*/
  @import "~/assets/scss/component.scss";

  $c: 'footer';

  .#{$c} {
    section { // inner sections
      margin-top: -2px;
      padding-top: 0;
      padding-bottom: 0;
    }

    &__col-menu, &__col-lang {
      @include media-breakpoint-up(lg) {
        margin-top: 41px;
      }
    }

    .logo__img {
      display: none;
      width: 100%;
      max-width: 370px;
      height: auto !important;

      @include media-breakpoint-up(lg) {
        display: inline-block;
      }
    }

    &__header {
      @include pxl-subtext();
      margin-bottom: 0 !important;
      margin-top: 0 !important;
      color: $pxl-color-main;

      @include media-breakpoint-up(lg) {
        display: none;
      }
    }

    &__association {
      display: block;
      margin: 0;

      p {
        @include pxl-subtext();
        margin-top: 0 !important;
      }

      @include media-breakpoint-up(lg) {
        margin-top: 2em;
        margin-left: 110px;
      }
    }


    &__nav-list {
      display: flex;
      flex-wrap: wrap;
      @include pxl-subtext();
    }

    &__nav-item {
      flex-basis: 100%;

      @include media-breakpoint-up(sm) {
        flex-basis: 50%;
      }
      @include media-breakpoint-up(lg) {
          flex-basis: 100%;
      }
    }

  }
</style>
