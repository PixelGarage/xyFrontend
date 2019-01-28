<template>
  <b-container v-bind:fluid="fluid">
    <b-navbar toggleable="md" type="light">
      <b-navbar-brand to="/">
        <b-img width="80" src="/pxl-logo.png"></b-img>
      </b-navbar-brand>
      <b-navbar-toggle class="border-0" target="nav_collapse"></b-navbar-toggle>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="w-100 justify-content-end align-items-center text-center">
          <b-nav-item to="/test-api">Test-Api</b-nav-item>
          <b-nav-item to="/contact">Kontakt</b-nav-item>
          <b-nav-item><user-menu/></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </b-container>
</template>

<script>
import UserMenu from './UserMenu.vue';

export default {
  components: {
    UserMenu,
  },
  props: {
    fluid: Boolean
  }
}
</script>

<style lang="scss" scoped>
/*
 * AppNavigation rules 
 * --------------------------------------------------*/
  @import "~/assets/scss/component.scss";

  nav {
    @include pxl-text();
  }

  .navbar-toggler {
    outline: none;
  }

</style>


