<template>
  <div class="container">
    <div id="main">
      <div id="auth-box">
        <div class="text-center">
          <font-awesome-icon :icon="['fas', 'chalkboard']" style="font-size: 4rem" />
        </div>
        <h1 class="text-center text-muted my-3">
          Sign in to
          <strong> Live Board </strong>
        </h1>
        <div class="wrapper">
          <b-form id="form-box">
            <label for="input-email">Email address</label>
            <b-form-input id="input-email" type="email" class="auth-input" required></b-form-input>

            <label for="input-password">Password</label>
            <b-form-input
              id="input-password"
              type="password"
              class="auth-input"
              required
            ></b-form-input>

            <b-button type="submit" variant="success btn-block">Sign in</b-button>
          </b-form>
          <div>
            <p>
              New to Live Board?
              <router-link to="/register"
                ><span class="ml-2"> Create an account. </span>
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {};
  },
  components: {},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/reset';
@import '../assets/sass/background';
@import '../assets/sass/signin';
</style>
