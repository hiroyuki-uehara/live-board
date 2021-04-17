<template>
  <div class="container">
    <Header>
      <div><p class="header-title ml-5">Board</p></div>
      <div>
        <div class="ml-auto mr-3" style="text-decoration: none" @click.prevent="showHomeModal">
          <b-button class="home-button" variant="outline-success">
            <p class="mr-3">
              <font-awesome-icon :icon="['fas', 'home-alt']" />
            </p>
            <p>Home</p></b-button
          >
        </div>
      </div>
    </Header>
    <div class="row">
      <Sidebar
        id="sidebar"
        class="col-md-3"
        :username="this.user.username"
        :nickname="this.user.nickname"
        :threads="threads"
        :thread_title="thread_title"
        :isAdmin="this.isAdmin"
        @name_clicked="memoThread"
        @thread_clicked="discussionThread"
        @plus_clicked="showThreadModal"
      >
        <b-dropdown class="sp_sidebar sidebar_dropdown_message" block variant="outline-light"
          ><template #button-content>
            <span style="font-size: 1.6rem; font-weight: bold">Direct Messages&nbsp;</span>
          </template>

          <b-dropdown-item
            v-for="user in otherUsers"
            :key="user.user_id"
            @click="chatThread(user)"
            class="sp_sidebar"
          >
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
            <span>{{ user.nickname }}</span>
          </b-dropdown-item>
        </b-dropdown>

        <div class="pc_sidebar mb-3">
          <p style="font-size: 2.5rem; font-weight: bold">Direct Messages</p>
        </div>
        <section
          v-for="user in otherUsers"
          :key="user.user_id"
          @click="chatThread(user)"
          class="pc_sidebar"
        >
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
          <span>{{ user.nickname }}</span>
        </section>
      </Sidebar>
      <div id="main" class="col-md-9">
        <!-- <Home> -->
        <div id="home-modal" v-show="homeModal">
          <Home @board_clicked="closeHomeModal" />
        </div>
        <!-- </Home> -->
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
              <span id="edit-message" class="text-muted"> edit mode </span>
              <font-awesome-icon
                :icon="['far', 'window-close']"
                class="edit-modal-icon text-muted"
                @click="closeEditModal"
              />
              <textarea
                ref="commentInput"
                autofocus
                v-model="comment"
                @keyup.enter.ctrl.exact.prevent="saveComment(comment)"
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
            <v-gravatar :email="email" :size="40" default-img="identicon" id="sp-identicon" />
          </div>
          <div v-else>
            <font-awesome-icon :icon="['fal', 'question-circle']" style="font-size: 3rem" />
          </div>
          <div id="info-message">
            <p style="font-weight: bold">
              {{ room
              }}<small
                v-show="this.room === this.user.nickname"
                class="ml-3 text-muted"
                style="font-size: 1.8rem"
                >you</small
              >
            </p>
            <p class="pc_sidebar">{{ thread_content }}</p>

            <div class="sp_sidebar" v-if="this.thread_content != ''">
              <b-button v-b-tooltip.hover.bottom :title="thread_content" variant="outline-dark"
                ><span>Question</span>
              </b-button>
            </div>
          </div>
          <div class="ml-auto">
            <b-button class="sp_sidebar" variant="outline-success" @click="showHomeModal">
              <span>Home</span>
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
            <div style="z-index: 60" id="identicon-box">
              <v-gravatar
                :email="comment.email"
                :size="50"
                default-img="identicon"
                id="identicon-size"
              />
            </div>
            <div class="comment-box">
              <h1>{{ comment.nickname }}</h1>
              <span class="readable" v-if="isAdmin === true"
                ><small class="text-muted mr-3">Readable?</small>{{ comment.isReadable }}</span
              >
              <div id="comment-content">
                <p>{{ comment.content }}</p>
              </div>
            </div>
            <div id="overlay" v-if="hideComment(comment)"></div>
            <div id="adminOverlay" v-if="adminComment(comment)"></div>
            <div class="toggle-box">
              <b-button
                variant="outline-primary"
                class="ml-auto"
                v-show="isAdmin === true"
                @click.prevent="pressShow(comment)"
                >Show</b-button
              >
              <b-button
                variant="outline-info"
                v-show="isAdmin === true"
                @click.prevent="pressHide(comment)"
                >Hide</b-button
              >
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
import Home from './Home.vue';

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
      homeModal: false,
      connectionRef: firebase.database().ref('connections'),
      connection_id: '',
      connections: [],
      isAdmin: false,
    };
  },
  components: {
    Header,
    Sidebar,
    Home,
  },
  beforeMount() {},
  mounted() {
    this.user = firebase.auth().currentUser;

    if (this.room_id !== '') {
      firebase.database().ref('comments').child(this.room_id).off();
    }

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
          this.user.lastRoom_id = snapshot.val().lastRoom_id;
          this.user.nickname = snapshot.val().nickname;
          if (this.user.username === 'Jay Gatsby') {
            this.isAdmin = true;
          }

          firebase
            .database()
            .ref('threads')
            .child(this.user.lastRoom_id)
            .once('value', (snapshot) => {
              if (snapshot.exists()) {
                this.room = snapshot.val().thread_title;
                this.thread_content = snapshot.val().thread_content;
              }
            });

          if (this.user.lastRoom_id === this.user.uid) {
            this.room = this.user.nickname;
            this.email = this.user.email;
            this.thread_content = '';
          } else {
            const chat_id = this.user.lastRoom_id
              .replace(this.user.uid, '')
              .replace('&', '')
              .trim();

            firebase
              .database()
              .ref('users')
              .child(chat_id)
              .once('value', (snapshot) => {
                if (snapshot.exists()) {
                  this.room = snapshot.val().username;
                  this.email = snapshot.val().email;
                  this.thread_content = '';
                }
              });
          }

          this.room_id = this.user.lastRoom_id;

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
            .on('child_removed', (oldsnapshot) => {
              this.comments = Object.values(this.comments).filter(
                (comment) => comment.comment_id !== oldsnapshot.val().comment_id
              );
            });

          firebase
            .database()
            .ref('comments')
            .child(this.room_id)
            .on('child_changed', (snapshot) => {
              const changedIndex = Object.values(this.comments).findIndex(
                (comment) => comment.comment_id === snapshot.val().comment_id
              );
              Object.values(this.comments)[changedIndex].isReadable = snapshot.val().isReadable;
            });
        }
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
      .ref('threads')
      .on('child_added', (snapshot) => {
        this.threads.push(snapshot.val());
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
      .ref('connections')
      .on('child_removed', (oldsnapshot) => {
        let remove_connection = oldsnapshot.val();

        this.connections = Object.values(this.connections).filter(
          (connection) => connection.connection_id !== remove_connection.connection_id
        );

        this.otherUsers.forEach((user) => {
          if (user.user_id === remove_connection.user_id) {
            user.status = 'offline';
          }
        });
      });
  },

  beforeDestroy() {
    firebase.database().ref('users').off();
    firebase.database().ref('threads').off();
    firebase.database().ref('comments').off();
    firebase.database().ref('.info/connected').off();
    firebase.database().ref('connections').off();
  },
  computed: {},

  methods: {
    memoThread() {
      this.comments = [];
      this.thread_content = '';

      this.room = this.user.nickname;
      this.email = this.user.email;
      this.placeholder = 'Jot something down';

      if (this.room_id !== '') {
        firebase.database().ref('comments').child(this.room_id).off();
      }

      this.room_id = this.user.uid;

      firebase.database().ref('users').child(this.user.uid).update({ lastRoom_id: this.room_id });

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
        .on('child_removed', (oldsnapshot) => {
          this.comments = Object.values(this.comments).filter(
            (comment) => comment.comment_id !== oldsnapshot.val().comment_id
          );
        });

      firebase
        .database()
        .ref('comments')
        .child(this.room_id)
        .on('child_changed', (snapshot) => {
          const changedIndex = Object.values(this.comments).findIndex(
            (comment) => comment.comment_id === snapshot.val().comment_id
          );
          Object.values(this.comments)[changedIndex].isReadable = snapshot.val().isReadable;
        });
    },

    discussionThread(thread) {
      this.comments = [];
      this.room = thread.thread_title;

      if (this.room_id !== '') {
        firebase.database().ref('comments').child(this.room_id).off();
      }

      this.room_id = thread.thread_id;

      firebase.database().ref('users').child(this.user.uid).update({ lastRoom_id: this.room_id });

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

      firebase
        .database()
        .ref('comments')
        .child(this.room_id)
        .on('child_removed', (oldsnapshot) => {
          this.comments = Object.values(this.comments).filter(
            (comment) => comment.comment_id !== oldsnapshot.val().comment_id
          );
        });

      firebase
        .database()
        .ref('comments')
        .child(this.room_id)
        .on('child_changed', (snapshot) => {
          const changedIndex = Object.values(this.comments).findIndex(
            (comment) => comment.comment_id === snapshot.val().comment_id
          );
          Object.values(this.comments)[changedIndex].isReadable = snapshot.val().isReadable;
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
      this.thread_content = '';

      if (this.room_id !== '') {
        firebase.database().ref('comments').child(this.room_id).off();
      }

      if (this.user.uid > user.user_id) {
        this.room_id = `${this.user.uid}&${user.user_id}`;
      } else {
        this.room_id = `${user.user_id}&${this.user.uid}`;
      }

      firebase.database().ref('users').child(this.user.uid).update({ lastRoom_id: this.room_id });

      this.room = user.nickname;
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
        .on('child_removed', (oldsnapshot) => {
          this.comments = Object.values(this.comments).filter(
            (comment) => comment.comment_id !== oldsnapshot.val().comment_id
          );
        });

      firebase
        .database()
        .ref('comments')
        .child(this.room_id)
        .on('child_changed', (snapshot) => {
          const changedIndex = Object.values(this.comments).findIndex(
            (comment) => comment.comment_id === snapshot.val().comment_id
          );
          Object.values(this.comments)[changedIndex].isReadable = snapshot.val().isReadable;
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
        nickname: this.user.nickname,
        email: this.user.email,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        isReadable: true,
      });

      firebase
        .database()
        .ref('threads')
        .once('child_added', (snapshot) => {
          if (this.room_id === snapshot.val().thread_id) {
            firebase.database().ref('comments').child(this.room_id).child(comment_id).update({
              isReadable: false,
            });
          }
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
      this.comment = this.post;
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
          nickname: this.user.nickname,
          email: this.user.email,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          isReadable: true,
        })
        .then(() => {
          this.editModal = false;
        });

      firebase
        .database()
        .ref('threads')
        .once('child_added', (snapshot) => {
          if (this.room_id === snapshot.val().thread_id) {
            firebase.database().ref('comments').child(this.room_id).child(this.post_id).update({
              isReadable: false,
            });
          }
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
    showHomeModal() {
      this.homeModal = true;
    },
    closeHomeModal() {
      this.homeModal = false;
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
      this.clearComment();
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
      firebase.database().ref('.info/connected').off();
      firebase.auth().signOut();
      this.$router.push('/signin');
    },

    pressShow(comment) {
      firebase.database().ref('comments').child(this.room_id).child(comment.comment_id).update({
        isReadable: true,
      });

      firebase
        .database()
        .ref('comments')
        .child(this.room_id)
        .once('value', (snapshot) => {
          this.comments = snapshot.val();
        });
    },
    pressHide(comment) {
      firebase.database().ref('comments').child(this.room_id).child(comment.comment_id).update({
        isReadable: false,
      });

      firebase
        .database()
        .ref('comments')
        .child(this.room_id)
        .once('value', (snapshot) => {
          this.comments = snapshot.val();
        });
    },
    hideComment(comment) {
      if (comment.username === this.user.username) {
        return false;
      } else if (comment.isReadable === true) {
        return false;
      } else if (this.isAdmin === true) {
        return false;
      } else {
        return true;
      }
    },
    adminComment(comment) {
      if (this.isAdmin === true && comment.isReadable === false) {
        return true;
      } else {
        return false;
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
@import '../assets/sass/thread';
@import '../assets/sass/edit';
</style>
