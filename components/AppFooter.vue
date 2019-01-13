<template>
  <footer class="footer">
    <b-container v-bind:fluid="fluid">
      <div class="d-flex justify-content-end align-items-center mx-3 border-top copy-right">© 2018+ Pixelgarage. All rights reserved | <b-link class="px-1" to="impressum">Impressum</b-link></div>
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
  @import "~/assets/scss/custom.scss";

  .copy-right {
    padding-top: 10px;
    padding-bottom: 10px;
    @include pxl-subtext();
  }
</style>

