<template>
  <PageApi v-bind="{latestRecipes}" />
</template>

<script>
import PageApi from '~/components/PageTestApi'
import DrupalApi from '~/api/DrupalApi'

export default {
  transition: 'slide-left',
  components: { PageApi },
  middleware: ['server-api-available'],
  async asyncData (context) {
    return Promise.all([DrupalApi.findAllLatestRecipes(4)]).then(
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
