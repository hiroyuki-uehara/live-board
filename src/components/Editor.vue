<template>
  <div id="editor">
    <textarea
      v-model="comment"
      @keyup.enter.ctrl.exact="$emit('comment_submit', comment)"
      :placeholder="placeholder"
    ></textarea>
    <b-button @click.prevent="clearComment" variant="outline-secondary" class="clear-button">
      <font-awesome-icon :icon="['fas', 'reply']" style="font-size: 3rem" class="mr-3" />
      <span>Clear</span>
    </b-button>
    <b-button
      @click.prevent="$emit('comment_submit', comment), clearComment"
      variant="outline-success"
      class="reply-button"
    >
      <font-awesome-icon :icon="['fas', 'reply']" style="font-size: 3rem" class="mr-3" />
      <span>Reply</span>
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'Editor',
  data() {
    return {
      comment: '',
    };
  },
  props: {
    placeholder: String,
  },
  components: {},
  methods: {
    clearComment() {
      this.comment = '';
      return this.comment;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/reset';
@import '../assets/sass/background';
@import '../assets/sass/editor';
</style>
