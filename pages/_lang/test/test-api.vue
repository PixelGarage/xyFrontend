<template>
  <TestApi v-bind="{latestRecipes}" />
</template>

<script>
import TestApi from '~/components/test/TestApi'
import PxlApi from '~/api/PxlApi'

export default {
  transition: 'slide-left',
  components: { TestApi },
  middleware: ['server-api-available'],
  async asyncData (context) {
    const latestRecipes = await PxlApi.findAllLatestRecipes();
    return { latestRecipes };
  },
  head () {
    return {
      title: this.$t('page.api-test.title'),
      titleTemplate: `%s | ${process.env.APP_TITLE}`,
      meta: [ { hid: 'description', name: 'description', content: this.$t('page.api-test.meta.descr') } ]
    }
  },
}
</script>
