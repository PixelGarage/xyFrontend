<script>
import Section from '~/components/Section';

export default {
  transition: 'fading',
  components : {
    Section
  },
  head () {
    return {
      title: this.$t('page.server-unreachable.title'),
      titleTemplate: `%s | ${process.env.APP_TITLE}`,
      meta: [
        { hid: 'description', name: 'description', content: this.$t('page.server-unreachable.meta.descr') },
        { hid: 'og:title', property: 'og:title', content: this.$t('page.server-unreachable.meta.title') },
        { hid: 'og:description', property: 'og:description', content: this.$t('page.server-unreachable.meta.descr') },
        { hid: 'og:url', property: 'og:url', content: this.$store.state.basePath + this.$i18n.path('server-unreachable') },
      ]
    }
  },
}
</script>

<template>
  <article class="server-unreachable">
    <b-row>
      <b-col class="col col-12">
        <p class="bold">{{ $t('page.server-unreachable.message') }}</p>
        <img src="/server-unreachable.gif" />
      </b-col>
    </b-row>
  </article>
</template>

<style lang="scss">
  /*
  * Server unreachable page section
  * --------------------------------------------------*/
  @import '~/assets/scss/page.scss';

  article {
    @include pxl-spacey(py, s1, section);

    section {
      @include pxl-space0(py);
    }
  }

</style>
