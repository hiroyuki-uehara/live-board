<template>
  <div id="info">
    <div>
      <v-gravatar :email="user.email" :size="40" default-img="identicon" />
    </div>
    <div>
      <p>{{ user.username }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Info',
  data() {
    return {};
  },
  props: {
    user: String,
  },
  components: {},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/reset';
@import '../assets/sass/background';
@import '../assets/sass/info';
</style>
