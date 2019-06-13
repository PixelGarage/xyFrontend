import Vue from 'vue'
import { config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false;

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
//library.add(fas);

// Register the component globally
Vue.component('font-awesome-icon', FontAwesomeIcon);
