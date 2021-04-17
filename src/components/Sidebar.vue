<template>
  <div id="sidebar">
    <div>
      <font-awesome-icon :icon="['fas', 'chalkboard']" style="font-size: 3rem" class="ml-2" />
      <span class="mr-auto ml-4">Live Board</span>
    </div>
    <section class="sp_username" @click="$emit('name_clicked', username)">
      <font-awesome-icon
        :icon="['fas', 'circle']"
        style="color: orange; font-size: 1.5rem"
        class="mr-1"
      />
      <span
        ><strong> {{ nickname }} </strong><span class="ml-3 text-muted">you</span>
      </span>
    </section>
    <b-button
      variant="outline-info"
      @click="$emit('plus_clicked')"
      class="sp-plus-circle sp_sidebar"
    >
      Create New Thread
    </b-button>
    <b-dropdown class="sp_sidebar sidebar_dropdown" block variant="outline-light">
      <template #button-content>
        <span style="font-size: 1.6rem; font-weight: bold">Threads&nbsp;</span>
      </template>
      <b-dropdown-item
        v-for="thread in threads"
        :key="thread.thread_id"
        @click="$emit('thread_clicked', thread)"
        class="sp_sidebar"
      >
        <font-awesome-icon
          :icon="['fal', 'question-circle']"
          style="font-size: 2rem"
          class="mr-3"
        />
        <span>{{ thread.thread_title }}</span>
      </b-dropdown-item>
    </b-dropdown>
    <div class="pc_sidebar plus-circle-box">
      <p>Threads</p>
      <p @click="$emit('plus_clicked')" class="pc-plus-circle" v-if="isAdmin">
        <font-awesome-icon :icon="['far', 'plus-circle']" class="pt-1 text-muted mr-3" />
      </p>
    </div>
    <section
      v-for="thread in threads"
      :key="thread.thread_id"
      @click="$emit('thread_clicked', thread)"
      class="pc_sidebar"
    >
      <font-awesome-icon :icon="['fal', 'question-circle']" style="font-size: 2rem" class="mr-3" />
      <span>{{ thread.thread_title }}</span>
    </section>
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
    nickname: String,
    user_id: String,
    thread_title: String,
    threads: Array,
    isAdmin: Boolean,
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
