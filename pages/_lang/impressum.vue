<template>
  <AppSection>
    <article v-html="content"></article>
  </AppSection>
</template>

<script>
import AppSection from '~/components/AppSection.vue'
import Impressum from "~/content/datenschutz.md"

export default {
  components: {
    AppSection,
  },
  head () {
    return {
      title: "Impressum - Pixelgarage",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "Haftungsausschluss bezüglich des Online-Angebotes und dessen Inhalt."
        }
      ]
    }
  },
  data () {
    return {
      content: Impressum,
    }
  }
  
}
</script>

