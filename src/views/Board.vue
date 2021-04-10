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
        @myemail_click="myMessage"
      />
      <div id="main" class="col-md-9">
        <!-- <Info> -->
        <div id="info">
          <div>
            <v-gravatar :email="email" :size="40" default-img="identicon" />
          </div>
          <div>
            <p>{{ room }}</p>
            <span>{{ comment }}</span>
          </div>
        </div>
        <!-- </Info> -->

        <!-- <Display> -->
        <div id="display">
          <div class="comment" v-for="(comment, index) in comments" :key="index">
            <span class="display-icon">
              <span>
                <font-awesome-icon :icon="['far', 'edit']" style="cursor: pointer" class="mr-3" />
              </span>
              <span @click="deleteComment(comment)">
                <font-awesome-icon
                  :icon="['fal', 'trash-alt']"
                  style="cursor: pointer"
                  class="mr-3"
                />
              </span>
            </span>
            <div><v-gravatar :email="comment.email" :size="80" default-img="identicon" /></div>
            <div>
              <h1>{{ comment.username }}</h1>
              <p>{{ comment.content }}</p>
            </div>
          </div>
        </div>
        <!-- </Display> -->

        <!-- <Editor> -->
        <div id="editor">
          <form>
            <textarea
              v-model="comment"
              :placeholder="placeholder"
              @keyup.enter.ctrl.exact.prevent="sendMessage(comment)"
            ></textarea>
            <b-button
              @click.prevent="clearComment"
              variant="outline-secondary"
              class="clear-button"
            >
              <font-awesome-icon :icon="['fas', 'reply']" style="font-size: 3rem" class="mr-3" />
              <span>Clear</span>
            </b-button>
            <b-button
              @click.prevent="sendMessage(comment)"
              variant="outline-success"
              class="reply-button"
            >
              <font-awesome-icon :icon="['fas', 'reply']" style="font-size: 3rem" class="mr-3" />
              <span>Reply</span>
            </b-button>
          </form>
        </div>
        <!-- </Editor> -->
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

export default {
  name: 'Board',
  data() {
    return {
      user: '',
      users: [],
      otherUsers: [],
      room: '',
      room_id: '',
      comment: '',
      comments: [],
      email: '',
      placeholder: '',
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
  },
  mounted() {
    this.user = firebase.auth().currentUser;
    this.email = this.user.email;

    firebase
      .database()
      .ref('users')
      .child(this.user.uid)
      .once('value', (snapshot) => {
        if (snapshot.exists()) {
          this.user.username = snapshot.val().username;
          this.myMessage(this.user.username);
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
    firebase.database().ref('comments').off();
  },
  methods: {
    directMessage(user) {
      this.comments = [];

      if (this.user.uid > user.user_id) {
        this.room_id = `${this.user.uid}-${user.user_id}`;
      } else {
        this.room_id = `${user.user_id}-${this.user.uid}`;
      }

      if (this.room_id !== '') {
        firebase.database().ref('comments').child(this.room_id).off();
      }

      this.room = user.username;
      this.email = user.email;
      this.placeholder = `Message to ${user.username}`;

      firebase
        .database()
        .ref('comments')
        .child(this.room_id)
        .on('child_added', (snapshot) => {
          this.comments.push(snapshot.val());
        });
    },
    myMessage(username) {
      this.comments = [];

      this.room = username;
      this.placeholder = 'Jot something down';

      if (this.room_id !== '') {
        firebase.database().ref('comments').child(this.room_id).off();
      }

      this.room_id = this.user.uid;

      firebase
        .database()
        .ref('comments')
        .child(this.user.uid)
        .on('child_added', (snapshot) => {
          this.comments.push(snapshot.val());
        });

      firebase
        .database()
        .ref('comments')
        .child(this.user.uid)
        .on('child_removed', (snapshot) => {
          this.comments.push(snapshot.val());
        });
    },
    sendMessage(comment) {
      this.comment = comment;
      console.log(this.comment);

      const newComment = firebase.database().ref('comments').child(this.room_id).push();

      const comment_id = newComment.key;

      newComment.set({
        comment_id,
        content: this.comment,
        username: this.user.username,
        email: this.user.email,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });

      this.comment = '';
    },
    deleteComment(comment) {
      if (window.confirm('Do you really want to delete this comment?')) {
        firebase.database().ref('comments').child(this.room_id).child(comment.comment_id).remove();

        firebase
          .database()
          .ref('comments')
          .child(this.room_id)
          .once('value', (snapshot) => {
            this.comments = snapshot.val();
          });
      } else {
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/reset';
@import '../assets/sass/background';
@import '../assets/sass/board';
@import '../assets/sass/info';
@import '../assets/sass/display';
@import '../assets/sass/editor';
</style>
