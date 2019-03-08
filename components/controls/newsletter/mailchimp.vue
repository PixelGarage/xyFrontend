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

Vue.use(VueJsonp, 5000)

export default {
  name: 'mailchimp',
  data () {
    return {
      email: '',
      emailFieldName: this.$t('comp.mailchimp.emailFieldName'),
      placeholder: this.$t('comp.mailchimp.placeholder'),
      gdpr_email: 'Y',
      loading: false,
      formSuccess: false,
      formMessage: '',
      showGDPR: true,
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
    this.subscriptionUrl = `https://**** ADD YOUR LIST ADDRESS HERE ***.list-manage.com/subscribe/post?u=${this.uid}&id=${this.lid}`;
    this.subscriptionUrl = this.subscriptionUrl.replace('post?u', 'post-json?u');
  },
  methods: {
    submitFormData(e) {
      // check email input
      if (this.errors.has(this.emailFieldName) || this.email.length <= 0) {
        this.loading = false
        this.formSuccess = false;
        this.email = '';
        this.placeholder = this.$t('comp.mailchimp.placeholder-err'),
        e.preventDefault();
      }
      else {
        // send collected form data
        this.loading = true;
        this.$jsonp(this.subscriptionUrl, {
          // Mailchimp form data: Keys are CASE_SENSITIVE!!!
          EMAIL: this.email,
          'gdpr[73]': this.gdpr_email,
          callbackQuery: 'c',
          callbackName: 'jsonpFunc'
        }).then(json => {
          this.loading = false
          if (json.result === 'success') {
            // cleanup form and emit submit event
            this.email = '';
            this.formSuccess = true
            this.formMessage =  this.$t('comp.mailchimp.success');
            const evtData = this.email;
            this.$emit('submit', evtData);
          } else {
            this.formSuccess = false
            this.formMessage = this.$t('comp.mailchimp.error');
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

        <div class="mailchimp__form-field-item">
          <label :for="emailFieldName">{{ $t('comp.mailchimp.emailFieldName') }}</label>
          <input type="email" v-model="email" :placeholder="placeholder" v-validate="'required|email'" :name="emailFieldName" class="mailchimp__email" :id="emailFieldName">

          <div v-if="errors.has(emailFieldName)" class="mailchimp__error-messages">
            <p class="mailchimp__error">
              {{ errors.first(emailFieldName) }}
            </p>
          </div>
        </div>

        <div class="mailchimp__form-field-submit">
          <button v-if="!loading" type="button" class="mailchimp__button-submit" :disabled="formSuccess" @click="submitFormData">
            {{ $t('comp.mailchimp.submit')}}
          </button>
          <img v-if="loading" class="mailchimp__loader" src="/loader-icon-dark.svg" alt="Loader Image"/>
        </div>

        <div v-if="showGDPR" class="mailchimp__gdpr-block">
          <div class="mailchimp__gdpr">
            <label>{{ $t('comp.mailchimp.gdpr.label') }}</label>
            <p>{{ $t('comp.mailchimp.gdpr.select-intro') }}</p>
            <fieldset class="mailchimp__fieldset" name="interestgroup_field">
              <label for="gdpr_73">
                <input type="checkbox" v-model="gdpr_email" id="gdpr_73" name="gdpr[73]" value="Y" class="mailchimp__checkbox" checked>
                <span>{{ $t('comp.mailchimp.gdpr.checkbox-email') }}</span>
              </label>
            </fieldset>
            <p>{{ $t('comp.mailchimp.gdpr.unsubscribe') }}</p>
          </div>

          <div class="mailchimp__gdpr-legal">
            <i18n path="comp.mailchimp.gdpr.legal" tag="p">
              <a place="link" href="https://mailchimp.com/legal/" target="_blank">{{ $t('comp.mailchimp.gdpr.link')}}</a>
            </i18n>
          </div>
        </div>
      </div>

      <transition name="fading">
        <div v-if="formMessage" :class="classMessageContainer">
          <!-- vhtml is needed to properly display return message from Mailchimp -->
          <p class="mailchimp__message" v-html="formMessage" />
        </div>
      </transition>
    </div>
  </div>
</template>

<style src="./mailchimp.scss" lang="scss"></style>
