<template>
  <section class="section error">
    <div class="error-page d-flex flex-column justify-content-center align-items-center">
      <div class="error">
        <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="#DBE1EC" viewBox="0 0 48 48">
          <path d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z" />
        </svg>
        <div class="error">Error {{ statusCode }}</div>
        <div class="title">{{ message }}</div>
        <b-link class="error-link" :to="$i18n.path('')">{{ $t('page.error.home') }}</b-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ErrorPage',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    return {
      title: this.message,
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
        }
      ]
    }
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500;
    },
    message() {
      return this.error.message || this.$t('page.error.message');
    }
  }
}
</script>

<style lang="scss">
  /*
  * Error page rules
  * --------------------------------------------------*/
  @import "~/assets/scss/layout.scss";

  .error-page {
    padding: 1rem;
    background: #F7F8FB;
    color: #47494E;
    text-align: center;

    .error {
      margin: 1rem auto;
      max-width: 450px;
    }
    .title {
      font-size: 1.5rem;
      margin-top: 15px;
      color: #47494E;
      margin-bottom: 8px;
    }
    .description {
      color: #7F828B;
      line-height: 21px;
      margin-bottom: 10px;
    }
    a {
      color: #7F828B !important;
      text-decoration: none;
    }
  }
</style>
