<template>
  <div id="display">
    <div class="comment" v-for="(comment, index) in comments" :key="index">
      <span class="display-icon">
        <span>
          <font-awesome-icon :icon="['far', 'edit']" style="cursor: pointer" class="mr-3" />
        </span>
        <span @click="deleteComment(comment)">
          <font-awesome-icon :icon="['fal', 'trash-alt']" style="cursor: pointer" class="mr-3" />
        </span>
      </span>
      <div><v-gravatar :email="comment.email" :size="80" default-img="identicon" /></div>
      <div>
        <h1>{{ comment.username }}</h1>
        <p>{{ comment.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/database';

export default {
  name: 'Display',
  data() {
    return {};
  },
  props: {
    comments: Array,
    room_id: String,
  },
  components: {},
  methods: {
    deleteComment(comment) {
      console.log(this.room_id);
      firebase.database().ref('comments').child(this.room_id).child(comment.comment_id).remove();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/reset';
@import '../assets/sass/background';
@import '../assets/sass/display';
</style>
