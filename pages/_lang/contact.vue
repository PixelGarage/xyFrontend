<template>
  <AppSection>
    <b-row>
      <b-col cols="12" md="6">
        <b-img src="/activism.jpg" class="d-block pb-3 w-100 rounded"></b-img>
      </b-col>
      <b-col cols="12" md="6" class="contact align-self-sm-center pb-3">
        <div v-html="contact"></div>
        <div>{{ $t('page.contact.invitation') }}</div>
      </b-col>
    </b-row>
  </AppSection>
</template>

<script>
import AppSection from '~/components/AppSection.vue'
import Contact from '~/content/contact.md'

export default {
  components: {
    AppSection
  },
  head () {
    return {
      title: this.$t('page.contact.title'),
      titleTemplate: `%s | ${process.env.APP_TITLE}`,
      meta: [ { hid: 'description', name: 'description', content: this.$t('page.contact.meta.descr') } ]
    }
  },
  data () {
    return {
      contact: Contact,
    }
  }
}
</script>

<style lang="scss">
/*
 * Contact page section 
 * --------------------------------------------------*/
  @import '~/assets/scss/page.scss';

  .contact {
    @include pxl-wysiwyg-body();
  }
</style>
