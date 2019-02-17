<template>
  <footer class="footer">
    <b-container v-bind:fluid="fluid">
      <div class="d-flex justify-content-end align-items-center mx-3 border-top copy-right">{{ $t('footer.copy-rights') }} | <b-link class="px-1" to="impressum">{{ $t('footer.impressum') }}</b-link></div>
    </b-container>
  </footer>

</template>

<script>
export default {
  props: {
    fluid: Boolean
  }
}
</script>

<style lang="scss" scoped>
/*
 * AppFooter rules 
 * --------------------------------------------------*/
  @import "~/assets/scss/component.scss";

  .copy-right {
    padding-top: 10px;
    padding-bottom: 10px;
    @include pxl-subtext();
  }
</style>

