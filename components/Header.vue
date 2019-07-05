<script>
import { mapGetters } from 'vuex'
import LangMenu from './LangMenu.vue'
import UserMenu from './UserMenu.vue'

export default {
  components: {
    LangMenu, UserMenu
  },
  props: {
    fluid: Boolean
  },
  computed: {
    ...mapGetters('lang', [
      'locale',
    ]),
  }
}
</script>

<template>
  <header class="header">
    <b-container class="header__container" v-bind:fluid="fluid">
      <b-navbar class="header__navbar" type="pxl-theme" toggleable="xl">
        <b-navbar-brand class="header__brand" :to="$i18n.path('')">
          <b-img width="80" src="/pxl-logo.png"></b-img>
        </b-navbar-brand>
        <b-navbar-toggle class="header__toggle border-0" target="header__nav-collapse"></b-navbar-toggle>
        <b-collapse is-nav id="header__nav-collapse" class="header__nav-collapse s-pt-s1">
          <b-navbar-nav class="w-100 justify-content-end align-items-end text-center">
            <b-nav-item class="header__nav-item" :to="$i18n.path('test/test-api')">{{ $t('header.menu.api-test') }}</b-nav-item>
            <b-nav-item class="header__nav-item" :to="$i18n.path('test/form-elements')">{{ $t('header.menu.form-elements') }}</b-nav-item>
            <b-nav-item class="header__nav-item" :to="$i18n.path('test/typography')">{{ $t('header.menu.typography') }}</b-nav-item>
            <b-nav-item class="header__nav-item" :to="$i18n.path('test/grid-spacing')">{{ $t('header.menu.grid-spacing') }}</b-nav-item>
            <b-nav-item class="header__nav-item" :to="$i18n.path('contact')">{{ $t('header.menu.contact') }}</b-nav-item>
            <UserMenu class="header__nav-item"/>
            <LangMenu class="header__nav-item" />
            <!--LangMenu class="header__nav-item"/-->
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-container>
  </header>
</template>

<style lang="scss">
/*
 * AppHeader rules
 * --------------------------------------------------*/
  @import "~/assets/scss/component.scss";

  $c: 'header';

  .#{$c} {
    &__navbar {
      overflow: hidden;
      padding: 0;
    }

    &__brand {
      margin: 0;
      padding: 0;
    }

    &__toggle {
      outline: none;
      padding: 0;
      margin: 0;
      min-width: auto;
      border: none;
      border-radius: 0;
      background: none !important;

      @include hover-focus-active {
        background: none !important;
      }

      .navbar-toggler-icon {
        width: 35px;
        height: 23px;
        background-image: url("/navi_burger.svg");
        opacity: 1;

        @include hover-focus-active {
          opacity: 0.6;
        }
      }
      &[aria-expanded="true"] .navbar-toggler-icon {
        height: 35px;
        background-image: url("/icon_close_dark.svg");
      }
    }

    &__nav-collapse {
      @include media-breakpoint-up(xl) {
        padding: 0;
      }
    }

    &__nav-item {
      margin-left: 0;
      @include media-breakpoint-up(xl) {
        margin-left: 30px;
        margin-bottom: 0;
      }

      a {
        padding: 0 !important;
        @include pxl-font-plain-style(subtitle);
        font-weight: bold;

        @include media-breakpoint-up(xl) {
          @include pxl-font-plain-style(subtext);
          font-weight: bold;
          margin-top: 0;
          margin-bottom: 0;
        }
      }
    }
  }

</style>
