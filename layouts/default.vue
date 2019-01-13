<template>
  <div>
    <AppNavigation v-bind:fluid="fluid"/>
    <b-container v-bind:fluid="fluidMain">
      <nuxt/>
    </b-container>
    <AppFooter v-bind:fluid="fluid"/>
  </div>
</template>

<script>
import AppNavigation from '~/components/AppNavigation'
import AppFooter from '~/components/AppFooter'

export default  {
  components: { AppNavigation, AppFooter },
  data() {
    return {
      fluid: true,
      fluidMain: false,
    }
  }
}
</script>

<style lang="scss">
  @import "~/assets/scss/custom.scss";

  .fade-enter-active,
  .fade-leave-active {
    position: absolute;
    top: 0;
    left: $grid-gutter-width/2;
    right: $grid-gutter-width/2;
    bottom: 0;
    transition: opacity 1.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-to,
  .fade-leave {
    opacity: 1;
  }

  //
  // slide left
  .slide-left-enter-active,
  .slide-left-leave-active {
    position: absolute;
    top: 0;
    left: $grid-gutter-width/2;
    right: $grid-gutter-width/2;
    bottom: 0;
    transition: transform 750ms ease-in-out;
  }
  .slide-left-enter {
    transform: translateX(100%);
  }
  .slide-left-enter-to {
    transform: translateX(0);
  }
  .slide-left-leave {
    transform: translateX(0);
  }
  .slide-left-leave-to {
    transform: translateX(-100%);
  }

</style>
