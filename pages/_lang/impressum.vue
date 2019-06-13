<script>
import Section from '~/components/Section.vue'
import Impressum from "~/content/impressum.md"

export default {
  transition: 'fading',
  components: {
    Section,
  },
  head () {
    return {
      title: this.$t('page.impressum.title'),
      titleTemplate: `%s | ${process.env.APP_TITLE}`,
      meta: [
        { hid: 'description', name: 'description', content: this.$t('page.impressum.meta.descr') },
        { hid: 'og:title', property: 'og:title', content: this.$t('page.impressum.meta.title') },
        { hid: 'og:description', property: 'og:description', content: this.$t('page.impressum.meta.descr') },
        { hid: 'og:url', property: 'og:url', content: this.$store.state.basePath + this.$i18n.path('impressum') },
        { hid: 'og:image', property: 'og:image', content: this.$store.state.basePath + '/bge-meta-image.jpg' },
        { hid: 'twitter:image', property: 'twitter:image', content: this.$store.state.basePath + '/bge-meta-image.jpg' },
        { hid: 'twitter:title', property: 'twitter:title', content: this.$t('page.impressum.meta.title') },
        { hid: 'twitter:description', property: 'twitter:description', content: this.$t('page.impressum.meta.descr') },
        { hid: 'twitter:url', property: 'twitter:url', content: this.$store.state.basePath + this.$i18n.path('impressum') },
      ]
    }
  },
  data () {
    return {
      impressum: Impressum,
    }
  }

}
</script>

<template>
  <article class="impressum">
    <b-row>
      <b-col class="col col-12">
        <div v-html="impressum"></div>
      </b-col>
    </b-row>
  </article>
</template>

<style lang="scss">
  /*
  * Impressum page section
  * --------------------------------------------------*/
  @import '~/assets/scss/page.scss';


  article {
    @include pxl-spacey(py, s1, section);

    section {
      @include pxl-space0(py);

      h2 {
        font-weight: bold;
      }

      p {
        @include pxl-subtext();
      }
    }
  }
</style>
