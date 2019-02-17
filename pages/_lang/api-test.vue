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
      title: 'Home',
      titleTemplate: `%s | ${process.env.title}`
    }
  }
}
</script>
