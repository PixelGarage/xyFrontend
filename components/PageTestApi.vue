<template>
  <div class="home">
  
    <AppSection v-if="latestRecipes" class="home-recipes">
      <h3 class="title text-center">Recipes</h3>
      <h4 class="title text-center">Explore recipes across every type of occasion, ingredient and skill level</h4>
      <no-ssr>
        <div v-masonry item-selector=".grid-item" column-width=".grid-sizer" gutter=".gutter-sizer" transition-duration="0.5s" class="grid-container">
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
    </AppSection>
  
  </div>
</template>

<script>
import AppSection from '~/components/AppSection'
import NoSSR from 'vue-no-ssr'

export default {
  components: { AppSection, 'no-ssr': NoSSR },
  props: {
    latestRecipes: { type: Array, default: [] },
  },
  data() {
    return {
      basePath: this.$store.state.basePath,
    }
  }
}
</script>

<style lang="scss">
  @import "~/assets/scss/page.scss";

  $masonry-gutter-width: 3%;

  .grid-container {
    margin: $masonry-gutter-width auto 0;
  }

  .gutter-sizer {
    width: $masonry-gutter-width;
  }

  .grid-sizer, .grid-item {
    margin: 0 0 $masonry-gutter-width;
    width: 100%;
    background-color: $orange;

    @include media-breakpoint-up(sm) {
      width: 50% - $masonry-gutter-width/2;
    }
    @include media-breakpoint-up(lg) {
      width: 33.333333% - $masonry-gutter-width*2/3;
    }
  }

  .grid-item {
    @include pxl-wysiwyg-body();

    em {
      margin-bottom: 0.5rem;
      @include pxl-subtext();
    }

    table {
      @include pxl-subtext();
      margin: -.5rem auto 1rem;
      width: 100%;

      th {
        font-weight: normal;
      }
    }
  }

</style>
