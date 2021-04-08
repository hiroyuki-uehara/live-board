<template>
  <footer>
    <div>
      <font-awesome-icon
        :icon="['fab', 'github']"
        style="color: white; font-size: 3rem"
        class="mr-3"
      />
      <font-awesome-icon
        :icon="['fab', 'bitbucket']"
        style="color: white; font-size: 3rem"
        class="mr-3"
      />
      <font-awesome-icon :icon="['fab', 'youtube']" style="color: white; font-size: 3rem" />
    </div>
    <p>Released under the MIT License</p>
    <p>Copyright &copy; 2021 Hiroyuki Uehara</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {};
  },
  components: {},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/reset';
@import '../assets/sass/background';
@import '../assets/sass/footer';
</style>
