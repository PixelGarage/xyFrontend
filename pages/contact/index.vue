<template>
  <AppSection>
    <b-row>
      <b-col cols="12" md="6">
        <b-img src="/activism.jpg" class="d-block pb-3 w-100 rounded"></b-img>
      </b-col>
      <b-col cols="12" md="6" class="contact align-self-sm-center pb-3" v-html="contact"></b-col>
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
  head() {
    return {
      title: 'Kontakt - Pixelgarage',
      meta: [
        {hid: 'description', name: 'description', content: "Kontaktdaten der Pixelgarage. "}
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

<style lang="scss" >
  @import "~/assets/scss/custom.scss";

  .coords, .directions, .contact {
    @include pxl-wysiwyg-body();
  }
</style>
