<template>
  <footer>
    <div>
      <a href="https://shinshumedicalcenter.jp/information/3742/" target="_blank">
        <font-awesome-icon
          :icon="['far', 'hospital-alt']"
          style="color: white; font-size: 2rem"
          class="mr-3"
        />
      </a>
      <a href="https://github.com/hiroyuki-uehara/live-board" target="_blank">
        <font-awesome-icon
          :icon="['fab', 'github']"
          style="color: white; font-size: 2rem"
          class="mr-3"
        />
      </a>
      <a href=" https://www.youtube.com/channel/UCfyNbRflBD1UHZFVvk1ji5Q" target="_blank">
        <font-awesome-icon :icon="['fab', 'youtube']" style="color: white; font-size: 2rem" />
      </a>
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
