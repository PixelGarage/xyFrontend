<template>
  <span>
    <b-link id="userMenuLink">
      <b-img :src="userImageUrl" v-if="loggedIn"></b-img>
      <span>{{userMenuLabel}}</span>
    </b-link>
    <b-popover target="userMenuLink" placement="bottomleft" triggers="focus">
      <!-- The Login form visible when no user is logged in -->
      <b-form @submit="onSubmit" v-if="!loggedIn">
        <b-form-group horizontal label="Name or email:" label-for="username" class="my-2 align-items-center">
          <b-form-input id="username" type="text" v-model="loginForm.name" required placeholder="Enter user name or email"></b-form-input>
        </b-form-group>
        <b-form-group horizontal label="Password:" label-for="password" class="my-2 align-items-center">
          <b-form-input id="password" type="password" v-model="loginForm.password" required placeholder="Enter password"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>

      <!-- The user menu visible when a user is logged in -->
      <div v-if="loggedIn">
        <b-link @click="logout">Logout</b-link>
      </div>
    </b-popover>
  </span>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data () {
    return {
      loginForm: {
        name: '',
        password: '',
      },
      userImageUrl: '',
      userMenuLabel: 'Login',
    }
  },
  computed: {
    ...mapGetters('user', [
      'loggedIn',
      'authenticating',
      'authErrorCode',
      'authErrorMessage'
    ]),
  },
  methods: {
    ...mapActions('user', [
      'login',
      'logout',
    ]),
    async onSubmit() {
      // Perform a simple validation that email and password have been typed in
      if (this.name != '' && this.password != '') {
        const result = await this.login(this.loginForm);
        if (result) {
          this.userMenuLabel = this.loginForm.name;
        }
        this.loginForm.password = ""
      }
    }

  },
}
</script>
