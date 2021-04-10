<template>
  <div id="info">
    <div>
      <v-gravatar :email="email" :size="40" default-img="identicon" />
    </div>
    <div>
      <p>{{ room }}</p>
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
    room: String,
    email: String,
  },
  components: {},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/reset';
@import '../assets/sass/background';
@import '../assets/sass/info';
</style>
