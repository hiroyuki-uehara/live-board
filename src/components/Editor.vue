<template>
  <div id="editor">
    <textarea
      v-model="comment"
      @keyup.enter.ctrl.exact="$emit('comment_submit', comment)"
    ></textarea>
    <b-button
      @click.prevent="$emit('comment_submit', comment)"
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
  props: {},
  components: {},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/reset';
@import '../assets/sass/background';
@import '../assets/sass/editor';
</style>
