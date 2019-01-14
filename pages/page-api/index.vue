<template>
  <AppSection>
    <PxlLogo/>
  </AppSection>
</template>


<script>
import AppSection from '~/components/AppSection.vue'
import PxlLogo from '~/components/PxlLogo.vue'

export default {
  components: {
    PxlLogo
  },
  middleware: ['server-api-available'],
}
</script>
