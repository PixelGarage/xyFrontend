<template>
  <PageApiTest v-bind="{latestRecipes}" />
</template>

<script>
import PageApiTest from '~/components/PageApiTest'
import DrupalApi from '~/api/DrupalApi'

export default {
  transition: 'slide-left',
  components: { PageApiTest },
  middleware: ['server-api-available'],
  async asyncData (context) {
    return Promise.all([DrupalApi.findAllLatestRecipes(6)]).then(
      values => {
        return {
          latestRecipes: values[0],
        }
      }
    )
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
