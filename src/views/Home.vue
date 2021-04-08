<template>
  <div>
    <Header>
      <router-link to="/board" class="mt-3 ml-auto mr-3">
        <b-button variant="outline-success"><p>to Board</p></b-button>
      </router-link>
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
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/reset';
@import '../assets/sass/background';
@import '../assets/sass/home';
</style>
