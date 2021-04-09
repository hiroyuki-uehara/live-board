<template>
  <div id="sidebar">
    <div>
      <font-awesome-icon :icon="['fas', 'chalkboard']" style="font-size: 3rem" class="ml-2" />
      <span class="mr-auto ml-4">Live Board</span>
    </div>
    <section @click="$emit('myemail_click', username)">
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
      <p>
        <font-awesome-icon :icon="['far', 'plus-circle']" class="pt-1 mr-3 text-muted" />
      </p>
    </div>
    <section v-for="thread in threads" :key="thread.thread_id">
      <font-awesome-icon :icon="['fal', 'question-circle']" style="font-size: 2rem" class="mr-3" />
      <span>{{ thread.title }}</span>
    </section>
    <div><p>Direct Messages</p></div>
    <section v-for="user in otherUsers" :key="user.user_id" @click="$emit('email_click', user)">
      <font-awesome-icon
        :icon="['fas', 'circle']"
        style="color: orange; font-size: 1.5rem"
        class="mr-3"
      /><span>{{ user.username }}</span>
    </section>
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
    threads: Array,
    otherUsers: Array,
  },
  components: {},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/reset';
@import '../assets/sass/background';
@import '../assets/sass/sidebar';
</style>
