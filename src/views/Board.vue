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
      <Sidebar
        id="sidebar"
        class="col-md-3"
        :email="user.email"
        :threads="threads"
        :users="users"
      />
      <div id="main" class="col-md-9">
        <Info :user="this.user" />
        <Display />
        <Editor />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import Info from '../components/Info.vue';
import Display from '../components/Display.vue';
import Editor from '../components/Editor.vue';

export default {
  name: 'Board',
  data() {
    return {
      user: '',
      users: [
        {
          user_id: 1,
          username: 'Jay Gatsby',
          email: 'jay@longisland.com',
          nickname: 'Jay',
        },
        {
          user_id: 2,
          username: 'Daisy Fay',
          email: 'daisy@longisland.com',
          nickname: 'Daisy',
        },
        {
          user_id: 3,
          username: 'Nick Carraway',
          email: 'nick@longisland.com',
          nickname: 'Nick',
        },
        {
          user_id: 4,
          username: 'Joe Fox',
          email: 'joe@ny152.com',
          nickname: 'Joe',
        },
      ],
      threads: [
        {
          thread_id: 1,
          title: 'Medicine',
        },
        {
          thread_id: 2,
          title: 'Mathematics',
        },
        {
          thread_id: 3,
          title: 'Physics',
        },
      ],
      comments: [],
    };
  },
  components: {
    Header,
    Sidebar,
    Info,
    Display,
    Editor,
  },
  mounted() {
    this.user = firebase.auth().currentUser;
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/reset';
@import '../assets/sass/background';
@import '../assets/sass/board';
</style>
