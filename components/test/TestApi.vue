<template>
  <div class="home">
  
    <Section v-if="latestRecipes" class="home-recipes">
      <h3 class="title text-center">{{ $t('comp.api-test.title') }}</h3>
      <h4 class="title text-center">{{ $t('comp.api-test.subtitle')}}</h4>
      <no-ssr>
        <div v-masonry class="grid-container" item-selector=".grid-item" column-width=".grid-sizer" gutter=".gutter-sizer" transition-duration="0.5s">
          <div class="grid-sizer"></div>
          <div class="gutter-sizer"></div>
          <div class="stamp"></div>
          <div v-masonry-tile class="grid-item p-3 rounded" v-for="(recipe, index) in latestRecipes" :key="index">
            <div v-if="recipe.image" class="">
              <b-img :src="basePath + recipe.image.thumbnail.uri.url" />
            </div>
            <div class="text-center">
              <span :class="recipe.difficulty">{{recipe.difficulty}}</span>
              <div class="description">
                <h3 class="text-center my-3">{{ recipe.title }}</h3>
              </div>
            </div>
          </div>
        </div>
      </no-ssr>
    </Section>
  
  </div>
</template>

<script>
import Section from '~/components/Section'
import NoSSR from 'vue-no-ssr'

export default {
  components: { Section, 'no-ssr': NoSSR },
  props: {
    latestRecipes: { type: Array, default: [] },
  },
  data () {
    return {
      basePath: this.$store.state.basePath,
    }
  },
}
</script>

<style lang="scss">
  @import "~/assets/scss/page.scss";

  .grid-container {
    @include pxl-masonry();
  }
</style>
