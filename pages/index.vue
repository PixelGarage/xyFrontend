<template>
  <AppSection class="main">
    <b-row>
      <b-col cols="12" md="6">
        <pxl-logo/>
      </b-col>
      <b-col class="my-4 align-self-center"  cols="12" md="6">
        <div class="main-title text-center text-md-left">Pixelgarage Frontend Template</div>
      </b-col>
    </b-row>
  </AppSection>
</template>

<script>
import AppSection from '~/components/AppSection.vue'
import PxlLogo from '~/components/PxlLogo.vue'

export default {
  components: {
    AppSection, PxlLogo,
  }
}
</script>

<style lang="scss">
/*
 *  Main page section 
 * --------------------------------------------------*/
  @import '~/assets/scss/page.scss';

  .main {
    min-height: 60vh;

    .main-title {
      @include pxl-title();
    }
  }

</style>
