<template>
  <AppSection class="main">
    <b-row>
      <b-col cols="12" md="6">
        <pxl-logo/>
      </b-col>
      <b-col class="my-4 align-self-center"  cols="12" md="6">
        <div class="main-title text-center text-md-left">{{ $t('page.home.intro')}}</div>
      </b-col>
    </b-row>
  </AppSection>
</template>

<script>
import AppSection from '~/components/AppSection.vue'
import PxlLogo from '~/components/logo/PxlLogo.vue'

export default {
  layout: 'default',
  components: {
    AppSection, PxlLogo,
  },
  head () {
    return {
      title: this.$t('page.home.title'),
      titleTemplate: `%s | ${process.env.APP_TITLE}`,
      meta: [ { hid: 'description', name: 'description', content: this.$t('page.home.meta.descr') } ]
    }
  },

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
