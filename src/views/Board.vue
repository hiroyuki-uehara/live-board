<template>
  <div class="container">
    <Header
      ><router-link to="/" class="mt-3 ml-auto mr-3">
        <b-button variant="outline-primary"><p>to Home</p></b-button>
      </router-link></Header
    >
    <div class="row">
      <Sidebar id="sidebar" class="col-md-3" />
      <div id="main" class="col-md-9"></div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';

export default {
  name: 'Board',
  data() {
    return {};
  },
  components: {
    Header,
    Sidebar,
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/reset';
@import '../assets/sass/background';
@import '../assets/sass/board';
</style>
