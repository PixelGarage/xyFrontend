<script>
import Section from '~/components/Section.vue'
import Contact from '~/content/contact.md'

export default {
  transition: 'fading',
  components: {
    Section
  },
  head () {
    return {
      title: this.$t('page.contact.title'),
      titleTemplate: `%s | ${process.env.APP_TITLE}`,
      meta: [
        { hid: 'description', name: 'description', content: this.$t('page.contact.meta.descr') },
        { hid: 'og:title', property: 'og:title', content: this.$t('page.contact.meta.title') },
        { hid: 'og:description', property: 'og:description', content: this.$t('page.contact.meta.descr') },
        { hid: 'og:image', property: 'og:image', content: this.$store.state.basePath + '/activism.jpg' },
        { hid: 'og:url', property: 'og:url', content: this.$store.state.basePath + this.$i18n.path('contact') },
        { hid: 'twitter:title', property: 'twitter:title', content: this.$t('page.contact.meta.title') },
        { hid: 'twitter:description', property: 'twitter:description', content: this.$t('page.contact.meta.descr') },
        { hid: 'twitter:image', property: 'twitter:image', content: this.$store.state.basePath + '/activism.jpg' },
        { hid: 'twitter:url', property: 'twitter:url', content: this.$store.state.basePath + this.$i18n.path('contact') },
      ]
    }
  },
  data () {
    return {
      contact: Contact,
    }
  }
}
</script>

<template>
  <Section>
    <b-row>
      <b-col class="col col-12 col-md-6">
        <b-img src="/activism.jpg" class="d-block w-100"></b-img>
      </b-col>
      <b-col cols="12" md="6" class="col col-12 col-md-6">
        <div v-html="contact"></div>
        <small>{{ $t('page.contact.invitation') }}</small>
      </b-col>
    </b-row>
  </Section>
</template>

<style lang="scss">
  /*
  * Contact page section
  * --------------------------------------------------*/
  @import '~/assets/scss/page.scss';

  section {
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
