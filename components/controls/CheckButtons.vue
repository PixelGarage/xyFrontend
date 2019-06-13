<script>
/**
 * Check buttons control with optional field.
 * 
 * An array of options will create the selectable buttons. 
 * An option is an object with the following structure: { text: string, value: string }
 * where the text is displayed in the button and the value will be added to the selection array when selected.
 * 
 * The text field can be used to add an additional term not included in the options. If the
 * other field contains a value, this value will be added to the selection array.
 * 
 * The control thrwos the usual events (change, input) and one new event 'select'. 
 * All events return the selection array.
 * 
 * TODO: make select the model of the control
 */
export default {
  inheritAttrs: false,
  props: {
    checked: Array,
    options: {
      type: Array,
      default: function () {
        return []; 
      }
    },
  },
  data () {
    return {
      selected: [],
      other: '',
      otherFieldName: this.$t('comp.check-buttons.otherFieldName'),
      placeholder: this.$t('comp.check-buttons.placeholder'),
    }
  },
  computed: {
    checkAttrs: function () {
      return Object.assign({}, this.$attrs);
    },
    checkListeners: function() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input: function (value) {
          const select = vm.other ? vm.selected.concat(vm.other) : vm.selected;
          vm.$emit('input', vm.selected);
          vm.$emit('select', select);
        },
        change: function (value) {
          const select = vm.other ? vm.selected.concat(vm.other) : vm.selected;
          vm.$emit('change', vm.selected);
          vm.$emit('select', select);
        }
      });
    },
  },
  methods: {
    onBlur: function(event) {
      if (this.errors.has(this.otherFieldName)) {
        this.other = '';
        this.placeholder = this.$t('comp.check-buttons.placeholder-err');
      }
      else {
        this.other = event.target.value;
        const select = this.other ? this.selected.concat(this.other) : this.selected;
        this.$emit('input', select);
        this.$emit('select', select);
      }
    }
  }
}
</script>

<template>
<div class="check-buttons">
  <div class="check-buttons-container d-flex flex-wrap ">
    <b-form-checkbox
        class="checkbox-container"
        v-for="option in options"
        v-model="selected"
        :key="option.value"
        :value="option.value"
        name="checkbox"
        inline
        v-bind="checkAttrs"
        v-on="checkListeners"
    >
      {{ option.text }}
      <span class="checkmark"></span>
    </b-form-checkbox>
    <div class="check-buttons__hint d-flex align-items-center justify-content-center">
      <b-img class="check-buttons__img" src="/icon_arrow_dark.svg"></b-img>
      <p class="check-buttons__descr legend">{{ $t('comp.check-buttons.descr') }}</p>
    </div>
  </div>
  <div class="check-buttons__other-container mt-3">
    <input type="text" :name="otherFieldName" :placeholder="placeholder" :value="other" @blur="onBlur" v-validate="'alpha_spaces'" class="check-buttons__other-input">
  </div>
</div>
</template>

<style lang="scss">
 /*
  * Check-buttons css-rules 
  * --------------------------------------------------*/
  @import "~/assets/scss/component.scss";

  $c: 'check-buttons';

  .#{$c} {
    &__hint {
      .#{$c}__img {
        margin-left: 1em;
        width: 40px;
        height: auto;
      }
      .#{$c}__descr {
        margin-left: 1em;
        max-width: 100%;
      }
    }
  }

  .checkbox-container {
    margin-right: 5rem;

    .checkbox-inner {
      label {
        display: none;
      }
    }
  }

</style>
