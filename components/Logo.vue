<script>
import { mapGetters } from 'vuex'

export default {
  components: {
  },
  props: {
    shadow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('lang', [
      'locale',
    ]),
  }
}
</script>

<template>
  <no-ssr>
    <div class="logo" v-bind:class="{ 'logo--shadow': shadow }">
      <b-img v-if="locale === 'de'" class="logo__img" src="/deinbge_logo_d.svg"></b-img>
      <b-img v-if="locale === 'en'" class="logo__img" src="/deinbge_logo_e.svg"></b-img>
      <b-img v-if="locale === 'fr'" class="logo__img" src="/deinbge_logo_f.svg"></b-img>
    </div>
  </no-ssr>
</template>

<style lang="scss">
  @import "~/assets/scss/component.scss";

  $c: 'logo';

  .#{$c} {
    &__img {
      display: block;
      height: auto;
      width: 220px;

      @include media-breakpoint-up(md) {
        width: 350px;
      }
      @include media-breakpoint-up(xl) {
        width: 400px;
      }
    }

    &--shadow .#{$c}__img {
      filter: drop-shadow( 0 1px 15px rgba(0,0,0,0.5));
    }
  }
</style>
