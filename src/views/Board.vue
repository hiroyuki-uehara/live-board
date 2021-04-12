<template>
  <div class="container">
    <Header>
      <div><p class="header-title ml-5">Board</p></div>
      <div>
        <router-link to="/" class="ml-auto mr-3" style="text-decoration: none">
          <b-button variant="outline-success">
            <p>
              <font-awesome-icon :icon="['fas', 'home-alt']" />
            </p>
            <p>Home</p></b-button
          >
        </router-link>
      </div>
    </Header>
    <div class="row">
      <Sidebar
        id="sidebar"
        class="col-md-3"
        :username="this.user.username"
        :threads="threads"
        :thread_title="thread_title"
        @name_clicked="memoThread"
        @plus_clicked="showThreadModal"
        @thread_clicked="discussionThread"
      >
        <section v-for="user in otherUsers" :key="user.user_id" @click="chatThread(user)">
          <span v-if="isOnline(user)">
            <font-awesome-icon
              :icon="['fas', 'circle']"
              style="color: orange; font-size: 1.5rem"
              class="mr-3"
            />
          </span>
          <span v-else>
            <font-awesome-icon
              :icon="['fas', 'circle']"
              style="color: gray; font-size: 1.5rem"
              class="mr-3"
            />
          </span>
          <span>{{ user.username }}</span>
        </section>
      </Sidebar>
      <div id="main" class="col-md-9">
        <!-- <Thread> -->
        <div id="thread" v-show="threadModal">
          <div id="thread-wrapper" @click.stop>
            <font-awesome-icon
              :icon="['far', 'window-close']"
              class="modal-icon text-muted"
              @click="closeThreadModal"
            />
            <b-form id="thread-box" @submit.prevent="">
              <p>Type in your new thread title and its contetnt.</p>
              <label for="thread_title">
                <span>Thread title</span>
              </label>
              <b-form-input
                id="thread_title"
                type="text"
                class="thread-input"
                required
                v-model="thread_title"
              ></b-form-input>

              <label for="thread_content">
                <span>Thread content</span>
              </label>
              <b-form-input
                id="thread_content"
                type="text"
                class="thread-input"
                required
                v-model="thread_content"
              ></b-form-input>
              <b-button variant="primary" type="submit" @click="addThread">Create thread</b-button>
            </b-form>
          </div>
        </div>
        <!-- </Thread> -->

        <!-- <Edit> -->
        <div id="edit" v-show="editModal">
          <div class="edit-wrapper" @click.stop>
            <div id="edit-box">
              <font-awesome-icon
                :icon="['far', 'window-close']"
                class="edit-modal-icon text-muted"
                @click="closeEditModal"
              />
              <textarea
                ref="commentInput"
                autofocus
                :placeholder="post"
                v-model.lazy="comment"
              ></textarea>
              <b-button
                @click.prevent="clearComment"
                variant="outline-secondary"
                class="edit-clear-button"
              >
                <font-awesome-icon :icon="['fas', 'reply']" style="font-size: 2rem" class="mr-3" />
                <span>Clear</span>
              </b-button>
              <b-button
                @click.prevent="saveComment(comment)"
                variant="outline-success"
                class="edit-reply-button"
              >
                <font-awesome-icon :icon="['fas', 'reply']" style="font-size: 2rem" class="mr-3" />
                <span>Save</span>
              </b-button>
            </div>

            <div id="dummy-edit"></div>
          </div>
        </div>
        <!-- </Edit> -->

        <!-- <Info> -->
        <div id="info">
          <div v-if="this.email != ''">
            <v-gravatar :email="email" :size="40" default-img="identicon" />
          </div>
          <div v-else>
            <font-awesome-icon :icon="['fal', 'question-circle']" style="font-size: 3rem" />
          </div>
          <div id="info-message">
            <p style="font-weight: bold">{{ room }}</p>
            <p>{{ thread_content }}</p>
          </div>
          <div class="ml-auto">
            <b-button variant="outline-primary" @click="doWhatsoever">
              <span>status</span>
            </b-button>
          </div>
          <div>
            <b-button variant="outline-light" @click="signOut">
              <span>Sign out</span>
            </b-button>
          </div>
        </div>
        <!-- </Info> -->

        <!-- <Display> -->
        <div id="display">
          <div class="comment" v-for="(comment, index) in comments" :key="index">
            <span class="display-icon">
              <template v-if="isAuthor(comment)">
                <span @click="editComment(comment)">
                  <font-awesome-icon :icon="['far', 'edit']" style="cursor: pointer" class="mr-3" />
                </span>
                <span @click="deleteComment(comment)">
                  <font-awesome-icon
                    :icon="['fal', 'trash-alt']"
                    style="cursor: pointer"
                    class="mr-3"
                  />
                </span>
              </template>
            </span>
            <div><v-gravatar :email="comment.email" :size="50" default-img="identicon" /></div>
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
              autofocus
              v-model="comment"
              :placeholder="placeholder"
              @keyup.enter.ctrl.exact.prevent="sendComment(comment)"
            ></textarea>
            <b-button
              @click.prevent="clearComment"
              variant="outline-secondary"
              class="clear-button"
            >
              <font-awesome-icon :icon="['fas', 'reply']" style="font-size: 2rem" class="mr-3" />
              <span>Clear</span>
            </b-button>
            <b-button
              @click.prevent="sendComment(comment)"
              variant="outline-success"
              class="reply-button"
            >
              <font-awesome-icon :icon="['fas', 'reply']" style="font-size: 2rem" class="mr-3" />
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
      thread_id: '',
      thread_title: '',
      thread_content: '',
      threads: [],
      threadModal: false,
      post: '',
      post_id: '',
      editModal: false,
      connectionRef: firebase.database().ref('connections'),
      connection_id: '',
      connections: [],
    };
  },
  components: {
    Header,
    Sidebar,
  },
  mounted() {
    this.user = firebase.auth().currentUser;

    firebase
      .database()
      .ref('.info/connected')
      .on('value', (snapshot) => {
        if (snapshot.val() === true) {
          let ref = this.connectionRef.push();
          this.connection_id = ref.key;
          ref.onDisconnect().remove();

          ref.set({
            user_id: this.user.uid,
            connection_id: this.connection_id,
          });
        }
      });

    firebase
      .database()
      .ref('users')
      .child(this.user.uid)
      .once('value', (snapshot) => {
        if (snapshot.exists()) {
          this.user.username = snapshot.val().username;
          this.memoThread(this.user.username);
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
        let user = snapshot.val();

        if (this.user.uid === user.user_id) {
          user.status = 'online';
        } else {
          user.status = 'offline;';
          this.otherUsers.push(user);
        }

        this.users.push(user);
      });

    firebase
      .database()
      .ref('connections')
      .on('child_added', (snapshot) => {
        let new_connection = snapshot.val();
        this.connections.push(new_connection);
        this.users.forEach((user) => {
          if (user.user_id === new_connection.user_id) {
            user.status = 'online';
          }
        });
        this.otherUsers.forEach((user) => {
          if (user.user_id === new_connection.user_id) {
            user.status = 'online';
          }
        });
      });

    firebase
      .database()
      .ref('threads')
      .on('child_added', (snapshot) => {
        this.threads.push(snapshot.val());
      });

    firebase
      .database()
      .ref('connections')
      .on('child_removed', (snapshot) => {
        let remove_connection = snapshot.val();

        this.connections = this.connections.filter((connection) => {
          return connection.connection_id !== remove_connection.connection_id;
        });

        let index = this.connections.findIndex((connection) => {
          return connection.user_id === remove_connection.user_id;
        });

        if (index === -1) {
          let user = this.users.find((user) => user.user_id === remove_connection.user_id);
          user.status = 'offline';
        }
      });
  },

  beforeDestroy() {
    firebase.database().ref('users').off();
    firebase.database().ref('comments').off();
    firebase.database().ref('threads').off();
    firebase.database().ref('.info/connected').off();
    firebase.database().ref('connections').off();
  },

  methods: {
    doWhatsoever() {
      console.log('clicked!!');
      // this.$refs.textInput.focus();
      document.getElementById('commentInput').focus();
    },

    memoThread(username) {
      this.comments = [];

      this.room = username;
      this.email = this.user.email;
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

          this.$nextTick(() => {
            let display_bottom = document.getElementById('display');
            display_bottom.scrollTop = display_bottom.scrollHeight;
          });
        });
    },

    discussionThread(thread) {
      this.comments = [];
      this.room = thread.thread_title;

      if (this.room_id !== '') {
        firebase.database().ref('comments').child(this.room_id).off();
      }

      this.room_id = thread.thread_id;

      this.email = '';
      this.thread_content = thread.thread_content;
      this.placeholder = `Comment on ${thread.thread_title}, please`;

      firebase
        .database()
        .ref('comments')
        .child(this.room_id)
        .on('child_added', (snapshot) => {
          this.comments.push(snapshot.val());
          this.$nextTick(() => {
            let display_bottom = document.getElementById('display');
            display_bottom.scrollTop = display_bottom.scrollHeight;
          });
        });
    },

    addThread() {
      const newThread = firebase.database().ref('threads').push();

      const thread_id = newThread.key;

      newThread
        .set({
          thread_id,
          thread_title: this.thread_title,
          thread_content: this.thread_content,
        })
        .then(() => {
          this.threadModal = false;
        });

      this.thread_title = '';
      this.thread_content = '';
    },

    chatThread(user) {
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
          this.$nextTick(() => {
            let display_bottom = document.getElementById('display');
            display_bottom.scrollTop = display_bottom.scrollHeight;
          });
        });

      firebase
        .database()
        .ref('comments')
        .child(this.room_id)
        .on('child_removed', (snapshot) => {
          this.comments.filter((comment) => {
            comment.comment_id !== snapshot.val().comment_id;
          });
        });
    },

    sendComment(comment) {
      this.comment = comment;

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

    editComment(comment) {
      this.post = '';
      this.post_id = comment.comment_id;

      firebase
        .database()
        .ref('comments')
        .child(this.room_id)
        .child(comment.comment_id)
        .once('value', (snapshot) => {
          this.post = snapshot.val().content;
        });
      this.showEditModal();
      this.$nextTick(() => {
        this.$refs.commentInput.focus();
      });
    },

    saveComment(comment) {
      this.comment = comment;

      firebase
        .database()
        .ref('comments')
        .child(this.room_id)
        .child(this.post_id)
        .set({
          comment_id: this.post_id,
          content: this.comment,
          username: this.user.username,
          email: this.user.email,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        })
        .then(() => {
          this.editModal = false;
        });

      firebase
        .database()
        .ref('comments')
        .child(this.room_id)
        .once('value', (snapshot) => {
          this.comments = snapshot.val();
        });

      this.comment = '';
      this.post_id = '';
    },

    deleteComment(comment) {
      firebase.database().ref('comments').child(this.room_id).child(comment.comment_id).remove();

      firebase
        .database()
        .ref('comments')
        .child(this.room_id)
        .once('value', (snapshot) => {
          this.comments = snapshot.val();
        });
    },

    clearComment() {
      this.comment = '';
      return this.comment;
    },

    showThreadModal() {
      this.thread_titel = '';
      this.thread_content = '';
      this.threadModal = true;
    },
    closeThreadModal() {
      this.threadModal = false;
    },
    showEditModal() {
      this.edit_titel = '';
      this.edit_content = '';
      this.editModal = true;
    },
    closeEditModal() {
      this.editModal = false;
      this.post_id = '';
    },

    isAuthor(comment) {
      if (comment.username === this.user.username) {
        return true;
      } else {
        return false;
      }
    },
    isOnline(user) {
      if (user.status === 'online') {
        return true;
      } else {
        return false;
      }
    },

    signOut() {
      this.connectionRef.child(this.connection_id).remove();
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
@import '../assets/sass/info';
@import '../assets/sass/display';
@import '../assets/sass/editor';
@import '../assets/sass/thread';
@import '../assets/sass/edit';
</style>
