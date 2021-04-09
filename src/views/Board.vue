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
        :username="this.user.username"
        :threads="threads"
        :otherUsers="otherUsers"
        @email_click="directMessage"
      />
      <div id="main" class="col-md-9">
        <Info :channel="channel" :email="this.user.email" />
        <Display />
        <Editor @comment_submit="sendMessage" />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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
      users: [],
      otherUsers: [],
      channel: '',
      comment: '',
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

    firebase
      .database()
      .ref('users')
      .child(this.user.uid)
      .once('value', (snapshot) => {
        if (snapshot.exists()) {
          this.user.username = snapshot.val().username;
          this.directMessage(this.user.username);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error.message);
      });

    firebase
      .database()
      .ref('users')
      .on('child_added', (snapshot) => {
        this.users.push(snapshot.val());
      });

    firebase
      .database()
      .ref('users')
      .on('child_added', (snapshot) => {
        if (this.user.username !== snapshot.val().username) {
          this.otherUsers.push(snapshot.val());
        }
      });
  },
  beforeDestroy() {
    firebase.database().ref('users').off();
  },
  methods: {
    directMessage(username) {
      this.channel = username;
    },
    sendMessage(comment) {
      this.comment = comment;
      console.log(this.comment);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/reset';
@import '../assets/sass/background';
@import '../assets/sass/board';
</style>
