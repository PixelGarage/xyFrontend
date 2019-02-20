<template>
  <AppSection>
    <article v-html="dataProtection"></article>
  </AppSection>
</template>

<script>
import AppSection from '~/components/AppSection.vue'
import DataProtection from "~/content/datenschutz.md"

export default {
  components: {
    AppSection,
  },
  head () {
    return {
      title: this.$t('page.data-protection.title'),
      titleTemplate: `%s | ${process.env.APP_TITLE}`,
      meta: [ { hid: 'description', name: 'description', content: this.$t('page.data-protection.meta.descr') } ]
    }
  },
  data () {
    return {
      dataProtection: DataProtection,
    }
  }
  
}
</script>

<style lang="scss">
  /*
  * Datenschutz page section 
  * --------------------------------------------------*/
  $pxl-footer-height: 350px;
  $pxl-footer-height-md: 150px;
  @import '~/assets/scss/page.scss';

  article {
    margin: 3rem auto;
    max-width: 700px;
    @include pxl-wysiwyg-body();

    ol {
      padding-left: 20px;
      font-weight: bold;
    }
  }
</style>


