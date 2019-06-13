<template>
  <span>
    <no-ssr>
      <b-link id="user_menu">
        <b-img class="user-img" :src="userImageUrl" v-if="loggedIn"></b-img>
        <span>{{userMenuLabel}}</span>
      </b-link>
      <b-popover target="user_menu" placement="bottomcenter" triggers="focus">
        <!-- A progress icon is visible when authenticating -->
        <div v-if="authenticating" class="d-flex justify-content-center align-items-center">
          <font-awesome-icon class="d-block m-3" size="3x" :icon="spinnerIcon" spin></font-awesome-icon>
          <div>{{ $t('comp.user-menu.auth') }}</div>
        </div>
        <!-- The Login form visible when no user is logged in -->
        <div v-else-if="!loggedIn">
          <b-form-group label="Name or email:" label-for="username">
            <b-form-input id="username" type="text" v-model="loginForm.name" required placeholder="Enter user name or email"></b-form-input>
          </b-form-group>
          <b-form-group label="Password:" label-for="password">
            <b-form-input id="password" type="password" v-model="loginForm.password" required placeholder="Enter password"></b-form-input>
          </b-form-group>
          <b-button @click="onSubmit" type="button" variant="primary" class="button-login my-3">{{ $t('comp.user-menu.login') }}</b-button>
        </div>
        <!-- The user menu is visible when a user is logged in -->
        <div v-else-if="loggedIn">
          <b-nav vertical justified>
            <b-nav-item to="/">{{ $t('comp.user-menu.cockpit') }}</b-nav-item>
            <b-nav-item disabled><hr></b-nav-item>
            <b-nav-item @click="logout">{{ $t('comp.user-menu.logout') }}</b-nav-item>
          </b-nav>
        </div>
        <!-- The login failed, display an error and a retry button -->
        <div v-else>
          <div>{{ $t('comp.user-menu.errMsg', {err: authErrorMessage}) }}</div>
        </div>
      </b-popover>
    </no-ssr>
  </span>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import NoSSR from 'vue-no-ssr'

export default {
  components: {
    'no-ssr': NoSSR,
  },
  data () {
    return {
      spinnerIcon: faCircleNotch,
      loginForm: {
        name: '',
        password: ''
      },
    }
  },
  computed: {
    ...mapGetters('user', [
      'loggedIn',
      'authenticating',
      'authErrorCode',
      'authErrorMessage'
    ]),
    userMenuLabel: function () {
      return this.loggedIn ? this.$store.state.user.user.name : this.$t('comp.user-menu.login');
    },
    userImageUrl: function () {
      return this.$store.state.user.user.url ? this.$store.state.basePath + this.$store.state.user.user.url : '/default.png';
    },
  },
  methods: {
    ...mapActions('user', [
      'login',
      'logout',
    ]),
    async onSubmit() {
      // Perform a simple validation that email and password have been typed in
      if (this.loginForm.name != '' && this.loginForm.password != '') {
        await this.login(this.loginForm);
        this.loginForm.password = ""
      }
    }

  },
}
</script>

<style lang="scss">
  @import "~/assets/scss/component.scss";

  #user_menu {
    padding: 0.5rem;
  }

  hr {
    margin: 0;
  }

  .form-group {
    width: 250px;
  }

  .user-img {
    width: 25px;
    height: auto;
  }

  .popover {
    padding: 2rem;
    @include theme-lightgray-black();
  }

</style>

