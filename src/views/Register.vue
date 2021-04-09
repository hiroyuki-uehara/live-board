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
                >Make sure it's at least 8 characters including a number and a lowercase
                letter.</small
              >
            </p>
            <div v-if="errors.length" class="error-message">
              <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
              </ul>
            </div>
            <div v-else class="error-message" style="opacity: 0">
              <ul>
                <li>dummy text</li>
              </ul>
            </div>
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
      errors: [],
    };
  },
  components: {
    Header,
  },
  computed: {},
  methods: {
    registerUser() {
      this.errors = [];
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((response) => {
          const user = response.user;
          firebase
            .database()
            .ref('users')
            .child(user.uid)
            .set({
              user_id: user.uid,
              username: this.username,
              email: user.email,
            })
            .then(() => {
              this.$router.push('/');
            })
            .catch((error) => {
              this.errors.push(error.message);
              this.username = '';
              this.email = '';
              this.password = '';
            });
        })
        .catch((error) => {
          this.errors.push(error.message);
          this.username = '';
          this.email = '';
          this.password = '';
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
