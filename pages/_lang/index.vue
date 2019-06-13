<template>
  <Section class="main">
    <b-row>
      <b-col cols="12" md="6">
        <pxl-logo/>
      </b-col>
      <b-col class="my-4 align-self-center"  cols="12" md="6">
        <div class="main-title text-center text-md-left">{{ $t('page.home.intro')}}</div>
      </b-col>
    </b-row>
  </Section>
</template>

<script>
import Section from '~/components/Section.vue'
import PxlLogo from '~/components/logo/PxlLogo.vue'

export default {
  layout: 'default',
  components: {
    Section, PxlLogo,
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


</style>
