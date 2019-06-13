<script>
/**
 * Slider input field
 * The slider can be configured with three attributes, min, med, max.
 * Min: value at the start of the slider
 * Max: value at the end of the slider
 * Med: value in the middle of the slider. If med = (min + max) / 2, the slider has a linear behaviour, 
 * otherwise the slider behaviour is non-linear.
 * 
 * CAUTION! The function has to be monotonously increasing, meaning min < med < max.
 * 
 * A monotonously function is the following:
 * f(x) = a + b * exp(c * x), with f(0) = min, f(0.5) = med, f(1) = max.
 * 
 * See https://stackoverflow.com/questions/7246622/how-to-create-a-slider-with-a-non-linear-scale 
 * for an explanation of the used formula.
 * 
 */
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    med: {
      type: [Number, String],
      default: 50
    },
  },
  data () {
    return {
      initValue: 0,
    }
  },
  computed: {
    internalValue: function() {
      return this.calcValue(this.value, true);
    },
    rangeAttrs: function () {
      return Object.assign({}, this.$attrs, {
        // ensure that the input type cannot be overridden
        type: "range",
        number: true
      });
    },
    rangeListeners: function() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input: function (value) {
          vm.$emit('input', vm.calcValue(value));
        },
        change: function (value) {
          vm.$emit('change', vm.calcValue(value));
        }
      });
    },
  },
  methods: {
    calcValue: function (value, inverse = false) {
      const x = Number(this.$attrs.min);
      const y = Number(this.med);
      const z = Number(this.$attrs.max);

      // linear case
      if ((x + z) == 2*y) return value;

      // non-linear case
      const d = x - 2*y + z;
      const a = (x*z - y*y) / d;
      const b = (y - x)*(y - x) / d;
      const c = 2*Math.log((z - y) / (y - x)) / (z - x);
      if (inverse) {
        // return internal slider value (inverse function)
        return Math.log((value - a) / b) / c;
      }
      // return external non-linear value in steps by ten
      let nonlinearValue = a + b*Math.exp(c*value);
      return Math.round(nonlinearValue / 10) * 10;
    }
  },
  mounted () {
    this.initValue = this.value;
  }
}
</script>

<template>
  <div class="range-input">
    <h1>{{ $t('comp.range-input.value', {val: value}) }}</h1>
    <b-form-input id="pxl_range" v-bind="rangeAttrs" :value="internalValue" v-on="rangeListeners"/>
    <div class="range-input__hint d-none align-items-center">
      <b-img class="range-input__img" src="/icon_arrow_dark.svg"></b-img>
      <div class="range-input__descr legend">{{ $t('comp.range-input.descr') }}</div>
    </div>
  </div>
</template>

<style lang="scss">
 /*
  * RangeInput rules 
  * --------------------------------------------------*/
  @import "~/assets/scss/component.scss";

  $c: 'range-input';

  .#{$c} {
    &__hint {
      .#{$c}__img {
        display: none;
        margin-left: 5px;
        width: 40px;
        height: auto;
      }
      .#{$c}__descr {
        max-width: 100%;
      }
    }

  }


</style>


