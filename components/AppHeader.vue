<template>
  <header class="header">
    <b-container v-bind:fluid="fluid">
      <b-navbar toggleable="md" type="light">
        <b-navbar-brand to="/">
          <b-img width="80" src="/pxl-logo.png"></b-img>
        </b-navbar-brand>
        <b-navbar-toggle class="header_toggle border-0" target="nav_collapse"></b-navbar-toggle>

        <b-collapse class="header__nav-collapse" is-nav id="nav_collapse">
          <b-navbar-nav class="w-100 justify-content-end align-items-center text-center">
            <b-nav-item class="header__nav-item" :to="$i18n.path('api-test')">{{ $t('header.menu.api-test') }}</b-nav-item>
            <b-nav-item class="header__nav-item" :to="$i18n.path('contact')">{{ $t('header.menu.contact') }}</b-nav-item>
            <UserMenu class="header__nav-item"/>
            <LangMenu class="header__nav-item" />
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-container>
  </header>
</template>

<script>
import LangMenu from './LangMenu.vue';
import { mapGetters } from 'vuex'

export default {
  components: {
    LangMenu,
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

<style lang="scss">
/*
 * AppHeader rules 
 * --------------------------------------------------*/
  @import "~/assets/scss/component.scss";

  .header {
    .header__toggle {
      outline: none;

      .navbar-toggler-icon {
        background-image: url("/navi_burger.svg");
        opacity: 1;

        @include hover-focus-active {
          opacity: 0.6;
        }
      }
    }

    .header__nav-collapse {
      .header__nav-item {
        a, span {
          @include pxl-menu();
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


