<template>
  <div class="container">
    <div id="main">
      <div id="auth-box">
        <router-link to="/register">
          <div class="text-center text-muted">
            <font-awesome-icon :icon="['fas', 'chalkboard']" style="font-size: 4rem" />
          </div>
        </router-link>
        <h1 class="text-center text-muted my-3">
          Sign in to
          <strong> Live Board </strong>
        </h1>
        <div class="wrapper">
          <b-form id="form-box" @submit.prevent="signIn">
            <label for="input-email">Username or email address</label>
            <b-form-input
              id="input-email"
              type="text"
              class="auth-input"
              required
              v-model="usernameOrEmail"
            ></b-form-input>

            <label for="input-password">Password</label>
            <b-form-input
              id="input-password"
              type="password"
              autocomplete="on"
              class="auth-input"
              required
              v-model="password"
            ></b-form-input>
            <div v-if="errors.length" class="error-message">
              <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
              </ul>
              <font-awesome-icon
                :icon="['fal', 'check-square']"
                class="ml-3 hide-button"
                @click="hideError"
              />
            </div>
            <div v-else class="error-message" style="opacity: 0">
              <ul>
                <li>dummy text</li>
              </ul>
            </div>
            <b-button type="submit" variant="success btn-block">Sign in</b-button>
          </b-form>
          <div>
            <p>
              <span>New to Live Board? </span>
              <router-link to="/register">
                <span class="ml-2">Create an account. </span>
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'SignIn',
  data() {
    return {
      usernameOrEmail: '',
      email: '',
      password: '',
      users: [],
      errors: [],
    };
  },
  components: {},
  mounted() {
    firebase
      .database()
      .ref('users')
      .on('child_added', (snapshot) => {
        this.users.push(snapshot.val());
      });
  },
  beforeDestroy() {
    firebase.database().ref('users').off();
  },
  methods: {
    signIn() {
      let user = this.users.find((user) => user.username === this.usernameOrEmail);
      if (user) {
        this.email = user.email;
      } else {
        this.email = this.usernameOrEmail;
      }

      this.errors = [];

      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push('/board');
          firebase.database().ref('users').off();
        })
        .catch((error) => {
          this.errors.push(error.message);
          this.usernameOrEmail = '';
          this.password = '';
        });
    },
    hideError() {
      this.errors = [];
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/reset';
@import '../assets/sass/background';
@import '../assets/sass/signin';
</style>
