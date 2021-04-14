<template>
  <div id="sidebar">
    <div>
      <font-awesome-icon :icon="['fas', 'chalkboard']" style="font-size: 3rem" class="ml-2" />
      <span class="mr-auto ml-4">Live Board</span>
    </div>
    <section @click="$emit('name_clicked', username)">
      <font-awesome-icon
        :icon="['fas', 'circle']"
        style="color: orange; font-size: 1.5rem"
        class="mr-1"
      />
      <span
        ><strong> {{ username }} </strong><span class="ml-3 text-muted">you</span>
      </span>
    </section>
    <div>
      <p>Threads</p>
      <p @click="$emit('plus_clicked')" id="plus-circle">
        <font-awesome-icon :icon="['far', 'plus-circle']" class="pt-1 mr-3 text-muted" />
      </p>
    </div>
    <section
      v-for="thread in threads"
      :key="thread.thread_id"
      @click="$emit('thread_clicked', thread)"
    >
      <font-awesome-icon :icon="['fal', 'question-circle']" style="font-size: 2rem" class="mr-3" />
      <span>{{ thread.thread_title }}</span>
    </section>
    <div><p>Direct Messages</p></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      channel: '',
    };
  },
  props: {
    username: String,
    user_id: String,
    thread_title: String,
    threads: Array,
  },
  components: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/reset';
@import '../assets/sass/background';
@import '../assets/sass/sidebar';
</style>
