<script>
import Section from '~/components/Section.vue'
import About from "~/content/about.md"

export default {
  transition: 'fading',
  components: {
    Section,
  },
  head () {
    return {
      title: this.$t('page.about.title'),
      titleTemplate: `%s | ${process.env.APP_TITLE}`,
      meta: [
        { hid: 'description', name: 'description', content: this.$t('page.about.meta.descr') },
        { hid: 'og:title', property: 'og:title', content: this.$t('page.about.meta.title') },
        { hid: 'og:description', property: 'og:description', content: this.$t('page.about.meta.descr') },
        { hid: 'og:image', property: 'og:image', content: this.$store.state.basePath + '/bge-meta-image.jpg' },
        { hid: 'og:url', property: 'og:url', content: this.$store.state.basePath + this.$i18n.path('about')},
        { hid: 'twitter:title', property: 'twitter:title', content: this.$t('page.about.meta.title') },
        { hid: 'twitter:description', property: 'twitter:description', content: this.$t('page.about.meta.descr') },
        { hid: 'twitter:image', property: 'twitter:image', content: this.$store.state.basePath + '/bge-meta-image.jpg' },
        { hid: 'twitter:url', property: 'twitter:url', content: this.$store.state.basePath + this.$i18n.path('about') },
      ]
    }
  },
  data () {
    return {
      about: About,
    }
  }

}
</script>

<template>
  <article class="about">
    <b-row>
      <b-col class="col col-12">
        <div v-html="about"></div>
      </b-col>
    </b-row>
  </article>
</template>

<style lang="scss">
  /*
  * About page section
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
