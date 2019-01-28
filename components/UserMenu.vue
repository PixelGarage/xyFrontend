<template>
  <span>
    <b-link id="userMenuLink">
      <b-img class="user-img" :src="userImageUrl" v-if="loggedIn"></b-img>
      <span>{{userMenuLabel}}</span>
    </b-link>
    <b-popover target="userMenuLink" placement="bottomleft" triggers="focus">
      <!-- A progress icon is visible when authenticating -->
      <div v-if="authenticating" class="d-flex justify-content-center align-items-center">
        <font-awesome-icon class="d-block my-3" size="3x" :icon="spinnerIcon" spin></font-awesome-icon>
        <div>authenticating...</div>
      </div>
      <!-- The Login form visible when no user is logged in -->
      <div v-else-if="!loggedIn">
        <b-form-group horizontal label="Name or email:" label-for="username" class="my-2 align-items-center">
          <b-form-input id="username" type="text" v-model="loginForm.name" required placeholder="Enter user name or email"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="Password:" label-for="password" class="my-2 align-items-center">
          <b-form-input id="password" type="password" v-model="loginForm.password" required placeholder="Enter password"></b-form-input>
        </b-form-group>
        <b-button @click="onSubmit" type="button" variant="primary">Submit</b-button>
      </div>
      <!-- The user menu is visible when a user is logged in -->
      <div v-else-if="loggedIn">
        <b-nav vertical justified>
          <b-nav-item to="/">Cockpit</b-nav-item>
          <b-nav-item disabled><hr></b-nav-item>
          <b-nav-item @click="logout">Logout</b-nav-item>
        </b-nav>
      </div>
      <!-- The login failed, display an error and a retryy button -->
      <div v-else>

      </div>
    </b-popover>
  </span>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

export default {
  components: {
    FontAwesomeIcon,
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
      return this.$store.state.user.user ? this.$store.state.user.user.name : 'Login';
    },
    userImageUrl: function () {
      return this.$store.state.user.user ? this.$store.state.basePath + this.$store.state.user.user.user_picture.uri.url : '';
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
  .user-img {
    width: 30px;
    height: auto;
  }
</style>

