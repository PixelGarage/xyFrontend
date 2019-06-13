<script>
  /*
   * Default layout with header and footer.
   */
export default {
  head () {
    return {
      bodyAttrs: { class: 'layout-testing' },
    }
  },
}
</script>


<template>
  <div class="main-container">
    <nuxt/>
  </div>
</template>


