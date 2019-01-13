<template>
  <AppSection>
    <logo/>
  </AppSection>
</template>


<script>
import AppSection from '~/components/AppSection.vue'
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  middleware: ['server-api-available'],
}
</script>
