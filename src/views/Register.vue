<template>
  <div class="container">
    <Header>
      <div><p style="font-size: 5rem; font-weight: 700" class="ml-5">Register</p></div>
      <div>
        <router-link to="/home" class="my-auto ml-auto mr-3">
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
    <div id="main"></div>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'Register',
  data() {
    return {};
  },
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/reset';
@import '../assets/sass/background';
@import '../assets/sass/register';
</style>
