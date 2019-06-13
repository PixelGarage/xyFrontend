<script>
/*
 * Mailchimp Newsletter Embed without leaving the page:
 * 1. Get your mailchimp subscription url:
 *    Login > Choose list > Signup Forms > Embedded Forms > Unstyled
 *    Copy url from <form action=""> and paste into the subscriptionUrl variable in mounted()
 *    Change 'post?u' to 'post-json?u' (https://stackoverflow.com/questions/8425701/ajax-mailchimp-signup-form-integration)
 * 2. Add your Mailchimp Input names in the JSONP request. E.g. ['EMAIL' | 'LNAME' | 'FNAME']
 *    Make sure that you used exactely the same names used in the embed code (case-sensitive)
 * 3. Add all input fields of the defined mailchimp form to the template and use the matching validation rules:
 *    https://baianat.github.io/vee-validate/guide/rules.html
 * 4. Test your fields and customize returned success message and emails
 *    Mailchimp > Form Builder > Translate it
 */
import Vue from 'vue';
import VueJsonp from 'vue-jsonp';
import VeeValidate from 'vee-validate'

Vue.use(VueJsonp, 5000);

export default {
  name: 'mailchimp',
  data () {
    return {
      email: '',
      emailFieldName: 'email',
      emailPlaceholder: this.$t('comp.mailchimp.emailPlaceholder'),
      name: '',
      nameFieldName: 'name',
      namePlaceholder: this.$t('comp.mailchimp.namePlaceholder'),
      plz: '',
      plzFieldName: 'plz',
      plzPlaceholder: this.$t('comp.mailchimp.plzPlaceholder'),
      gdpr_email: 'Y',
      loading: false,
      formSuccess: false,
      formMessage: '',
      showGDPR: false,
      subscriptionUrl: false,
    };
  },
  props: {
    lid: {
      type: String,
      default: '',
      required: true
    },
    uid: {
      type: String,
      default: '',
      required: true
    }
  },
  computed: {
    classMessageContainer: function () {
      return 'mailchimp__message-container' + 
        (this.formSuccess ? ' mailchimp__message-container--success' : '') + 
        (!this.formSuccess && this.formMessage ? ' mailchimp__message-container--error' : '');
    }
  },
  mounted () {
    //
    // add the specific list subscription url here (uid and lid are required properties of the component)
    this.subscriptionUrl = `https://deinbge.us9.list-manage.com/subscribe/post?u=${this.uid}&id=${this.lid}`;
    this.subscriptionUrl = this.subscriptionUrl.replace('post?u', 'post-json?u');
  },
  methods: {
    submitFormData(e) {
      // check email input
      if (this.errors.has(this.emailFieldName) || this.email.length <= 0) {
        this.loading = false;
        this.formSuccess = false;
        this.email = '';
        this.emailPlaceholder = this.$t('comp.mailchimp.emailPlaceholder-err'),
        e.preventDefault();
      }
      else if (this.errors.has(this.nameFieldName)) {
        this.loading = false;
        this.formSuccess = false;
        this.name = '';
        this.namePlaceholder = this.$t('comp.mailchimp.namePlaceholder-err'),
        e.preventDefault();
      }
      else if (this.errors.has(this.plzFieldName)) {
        this.loading = false;
        this.formSuccess = false;
        this.plz = '';
        this.plzPlaceholder = this.$t('comp.mailchimp.plzPlaceholder-err'),
        e.preventDefault();
      }
     else {
        // send collected form data
        this.loading = true;
        this.$jsonp(this.subscriptionUrl, {
          // Mailchimp form data: Keys are CASE_SENSITIVE!!!
          EMAIL: this.email,
          FNAME: this.name,
          PLZ: this.plz,
          'gdpr[73]': this.gdpr_email,
          callbackQuery: 'c',
          callbackName: 'jsonpFunc'
        }).then(json => {
          this.loading = false;
          if (json.result === 'success') {
            // cleanup form and emit submit event
            this.formSuccess = true;
            this.formMessage =  this.$t('comp.mailchimp.success');
            const evtData = {
              'user_email': this.email,
              'user_name': this.name,
              'user_plz': this.plz
            };
            this.$emit('submit', evtData);
            this.email = '';
          }
          else {
            this.formSuccess = false;
            this.formMessage = json.msg || this.$t('comp.mailchimp.error');
          }
        });
      }
    }
  }
}
</script>

<template>
  <div v-if="subscriptionUrl" class="mailchimp">
    <div class="mailchimp__form">
      <div v-if="!formMessage" class="mailchimp__form-fields">

        <div class="mailchimp__subscription-block d-flex flex-wrap justify-content-start align-items-start">
          <div class="mailchimp__form-field-item flex-fill">
            <label class="mailchimp__label" :for="emailFieldName">{{ $t('comp.mailchimp.emailLabel') }}</label>
            <input type="email" class="mailchimp__email" v-model="email" :placeholder="emailPlaceholder" v-validate="'required|email'" :name="emailFieldName" :id="emailFieldName">
          </div>
          <div class="mailchimp__form-field-item flex-fill">
            <label class="mailchimp__label" :for="nameFieldName">{{ $t('comp.mailchimp.nameLabel') }}</label>
            <input type="text" class="mailchimp__name" v-model="name" :placeholder="namePlaceholder" :name="nameFieldName" :id="nameFieldName">
          </div>
          <div class="mailchimp__form-field-item flex-fill">
            <label class="mailchimp__label" :for="plzFieldName">{{ $t('comp.mailchimp.plzLabel') }}</label>
            <input type="text" class="mailchimp__plz" v-model="plz" :placeholder="plzPlaceholder" v-validate="'between:1000,9999'" :name="plzFieldName" :id="plzFieldName">
          </div>

          <div class="mailchimp__form-field-submit">
            <button v-if="!loading" type="button" class="mailchimp__button-submit" :disabled="formSuccess" @click="submitFormData">
              {{ $t('comp.mailchimp.submit')}}
            </button>
            <img v-if="loading" class="mailchimp__loader" src="/loader-icon-dark.svg" alt="Loader Image"/>
          </div>
        </div>

        <div v-if="showGDPR" class="mailchimp__gdpr-block">
          <div class="mailchimp__gdpr">
            <h3 class="legend bold">{{ $t('comp.mailchimp.gdpr.label') }}</h3>
            <div class="legend">{{ $t('comp.mailchimp.gdpr.select-intro') }}</div>
            <label for="gdpr_73" class="checkbox-container">
              <input type="checkbox" class="mailchimp__checkbox" v-model="gdpr_email" id="gdpr_73" name="gdpr[73]" value="Y" checked>
              <span>{{ $t('comp.mailchimp.gdpr.checkbox-email') }}</span>
              <span class="checkmark"></span>
            </label>
            <div class="legend">{{ $t('comp.mailchimp.gdpr.unsubscribe') }}</div>
          </div>

          <div class="mailchimp__gdpr-legal">
            <i18n path="comp.mailchimp.gdpr.legal" tag="div">
              <a place="link" href="https://mailchimp.com/legal/" target="_blank">{{ $t('comp.mailchimp.gdpr.link')}}</a>
            </i18n>
          </div>
        </div>
      </div>

      <transition name="fading">
        <div v-if="formMessage" :class="classMessageContainer">
          <!-- v-html is needed to properly display return message from Mailchimp -->
          <p class="mailchimp__message" v-html="formMessage" />
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss">
  /*
  * Mailchimp rules 
  * --------------------------------------------------*/
  @import "~/assets/scss/component.scss";

  $c: 'mailchimp';

  .#{$c} {
    position: relative;
    width: 100%;

    &__form {
      width: 100%;
    }

    &__form-field-item {
      width: 100%;

      label {
        display: none;
      }

      .#{$c}__email,
      .#{$c}__name,
      .#{$c}__plz {
        margin-top: 0 !important;
      }
    }

    &__gdpr-legal {
      div {
        @include pxl-legendtext();
      }
    }

    &__message-container {
      display: block;
      @include pxl-formtext();

      a {
        @include pxl-link-underline-on();
      }
    }
  }
</style>
