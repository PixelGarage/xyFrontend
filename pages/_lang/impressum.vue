<template>
  <AppSection>
    <article v-html="impressum"></article>
  </AppSection>
</template>

<script>
import AppSection from '~/components/AppSection.vue'
import Impressum from "~/content/impressum.md"

export default {
  components: {
    AppSection,
  },
  head () {
    return {
      title: this.$t('page.impressum.title'),
      titleTemplate: `%s | ${process.env.APP_TITLE}`,
      meta: [ { hid: 'description', name: 'description', content: this.$t('page.impressum.meta.descr') } ]
    }
  },
  data () {
    return {
      impressum: Impressum,
    }
  }
  
}
</script>

<style lang="scss">
  /*
  * Impressum page section 
  * --------------------------------------------------*/
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

