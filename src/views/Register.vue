<template>
  <div class="container">
    <Header>
      <div><p class="header-title ml-5">Register</p></div>
      <div>
        <router-link to="/" class="my-auto ml-auto mr-3">
          <b-button variant="outline-success"><p>Home</p></b-button>
        </router-link>
        <router-link to="/board" class="my-auto mr-3">
          <b-button variant="outline-primary"><p>Board</p></b-button>
        </router-link>
        <router-link to="/signin" class="my-auto mr-3">
          <b-button variant="outline-warning"><p>Sign in</p></b-button>
        </router-link>
      </div>
    </Header>
    <div id="main">
      <div id="auth-box">
        <p class="text-center text-muted">Join Live Board</p>
        <h1 class="text-center">Create your account</h1>
        <div id="form-box">
          <b-form @submit.prevent="registerUser">
            <label for="input-username">Username<sup> *</sup></label>
            <b-form-input
              id="input-username"
              type="text"
              v-model="username"
              class="auth-input"
              required
            ></b-form-input>

            <label for="input-email">Email address<sup> *</sup></label>
            <b-form-input
              id="input-email"
              type="email"
              v-model="email"
              class="auth-input"
              required
            ></b-form-input>
            <p>
              <small class="text-muted ml-3">We'll never share your email with anyone else.</small>
            </p>

            <label for="input-password">Password<sup> *</sup></label>
            <b-form-input
              id="input-password"
              type="password"
              v-model="password"
              class="auth-input"
              required
            ></b-form-input>
            <p>
              <small class="text-muted ml-3"
                >Make sure it's at least 15 characters OR at least 8 characters including a number
                and a lowercase letter.</small
              >
            </p>
            <b-button type="submit" variant="primary btn-block">Create account</b-button>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

import Header from '../components/Header.vue';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  components: {
    Header,
  },
  methods: {
    registerUser() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((response) => {
          console.log(response.user.email);
        })
        .catch((error) => {
          console.error(error.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/reset';
@import '../assets/sass/background';
@import '../assets/sass/register';
</style>
