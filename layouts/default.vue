<script>
  /*
   * Default layout with header and footer.
   */
  import Header from '~/components/Header'
  import Footer from '~/components/Footer'

  export default  {
    components: { Header, Footer },
    data() {
      return {
        fluid: true,
        fluidMain: true,
      }
    },
    head () {
      return {
        bodyAttrs: { class: 'layout-default'},
      }
    },
  }
</script>


<template>
  <div>
    <Header class="theme-white-black" :fluid="fluid"/>
    <div class="main-container">
      <b-container class="theme-white-black" :fluid="fluidMain">
        <nuxt/>
      </b-container>
    </div>
    <Footer class="theme-black-lightgray" :fluid="fluid"/>
  </div>
</template>


<style lang="scss">
/*
 * Default Layout rules
 * --------------------------------------------------*/
  @import "~/assets/scss/layout.scss";

  //
  // Document
  //
  body.layout-default {
    .main-container {
      position: relative;
      min-height: calc(100vh + #{$pxl-footer-min-height});
      padding-bottom: $pxl-footer-min-height;

      @include media-breakpoint-up(lg) {
        padding-bottom: $pxl-footer-min-height-md;
        min-height: calc(100vh + #{$pxl-footer-min-height-md});
      }
    }

    footer {
      display: flex;
      position: relative;
      align-items: center;
      min-height: $pxl-footer-min-height;
      margin-top: (-1 * $pxl-footer-min-height);

      @include media-breakpoint-up(lg) {
        margin-top: (-1 * $pxl-footer-min-height-md);
        min-height: $pxl-footer-min-height-md;
      }
    }
  }

</style>
