<template>
  <div class="container">
    <Header>
      <div><p class="header-title ml-5">Board</p></div>
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
      <div id="main" class="col-md-9">
        <b-button variant="light" @click="signOut">
          <p>Sign out</p>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

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
  methods: {
    signOut() {
      firebase.auth().signOut();
      this.$router.push('/signin');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/reset';
@import '../assets/sass/background';
@import '../assets/sass/board';
</style>
