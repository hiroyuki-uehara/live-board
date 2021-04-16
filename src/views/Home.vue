<template>
  <div class="container">
    <Header>
      <div><p class="header-title ml-5">Home</p></div>
      <div>
        <template v-if="isStillOnline">
          <router-link to="/board" class="my-auto ml-auto mr-3">
            <b-button variant="outline-primary" class="board-button"
              ><p>
                <font-awesome-icon :icon="['fas', 'chalkboard']" style="font-size: 2rem" />
              </p>
              <p>Board</p></b-button
            >
          </router-link>
        </template>
        <template v-else>
          <router-link to="/signin" class="my-auto ml-auto mr-2">
            <b-button variant="outline-secondary" style="border: none"><p>Sign in</p></b-button>
          </router-link>
          <router-link to="/register" class="my-auto ml-3 mr-3">
            <b-button variant="outline-dark"><p>Sign up</p></b-button>
          </router-link>
        </template>
      </div>
    </Header>
    <div id="main">
      <section>
        <img src="../assets/images/medicine2.jpeg" alt="" class="photo" />
        <article class="en-legend">
          <h1>Medicine</h1>
          <p>Why is Western medicine the dominant form of medicine today?</p>
        </article>
        <article class="ja-legend">
          <p>
            西洋医学は、今日の主流の医学となっていますが、
            何故、西洋医学が今の地位にあると考えますか？
          </p>
        </article>
      </section>
      <section>
        <img src="../assets/images/math.jpeg" alt="" class="photo" />
        <article class="en-legend">
          <h1>Mathematics</h1>
          <p>Why has mathematics become mathematics as we know it today?</p>
        </article>
        <article class="ja-legend">
          <p>
            数学は元来、自由に創造されてしかるべきですが、
            何故、今日の数学のように発展したのでしょうか？
          </p>
        </article>
      </section>
      <section>
        <img src="../assets/images/physics.jpg" alt="" class="photo" />
        <article class="en-legend">
          <h1>Physics</h1>
          <p>What makes life possible?</p>
        </article>
        <article class="ja-legend">
          <p>生命現象は、何故、可能なのでしょうか？</p>
        </article>
      </section>
    </div>
    <Footer />
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'Home',
  data() {
    return {
      isStillOnline: false,
    };
  },
  components: {
    Header,
    Footer,
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isStillOnline = true;
      } else {
        this.isStillOnline = false;
      }
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/reset';
@import '../assets/sass/background';
@import '../assets/sass/home';
</style>
