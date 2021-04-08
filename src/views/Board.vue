<template>
  <div class="container">
    <Header>
      <div><p style="font-size: 5rem; font-weight: 700" class="ml-5">Board</p></div>
      <div>
        <router-link to="/" class="ml-auto mr-3">
          <b-button variant="outline-success"><p>Home</p></b-button>
        </router-link>
        <router-link to="/register" class="mr-3">
          <b-button variant="outline-dark"><p>Register</p></b-button>
        </router-link>
        <router-link to="/signin" class="mr-3">
          <b-button variant="outline-warning"><p>Sign in</p></b-button>
        </router-link>
      </div>
    </Header>
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
