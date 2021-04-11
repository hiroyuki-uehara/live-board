<template>
  <div class="container">
    <Header>
      <div><p class="header-title ml-5">Home</p></div>
      <div>
        <router-link to="/signin" class="my-auto ml-auto mr-3">
          <b-button variant="outline-secondary" style="border: none"><p>Sign in</p></b-button>
        </router-link>
        <router-link to="/register" class="my-auto ml-3 mr-3">
          <b-button variant="outline-dark"><p>Sign up</p></b-button>
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
  name: 'Home',
  data() {
    return {};
  },
  components: {
    Header,
    Footer,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/reset';
@import '../assets/sass/background';
@import '../assets/sass/home';
</style>
