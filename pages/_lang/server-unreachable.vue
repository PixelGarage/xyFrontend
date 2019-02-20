<template>
  <appSection>
    <h1 class="title is-4">{{ $t('page.server-unreachable.message') }}</h1>
    <img src="~assets/images/server-unreachable.gif" />
  </appSection>
</template>

<script>
import AppSection from '~/components/AppSection';

export default {
  components : { 
    AppSection
  },
  head () {
    return {
      title: this.$t('page.server-unreachable.title'),
      titleTemplate: `%s | ${process.env.APP_TITLE}`,
      meta: [ { hid: 'description', name: 'description', content: this.$t('page.server-unreachable.meta.descr') } ]
    }
  },
}
</script>