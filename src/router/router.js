import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase/app';
import 'firebase/auth';

import Home from '../views/Home.vue';
import Board from '../views/Board.vue';
import Register from '../views/Register.vue';
import SignIn from '../views/SignIn.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/board',
    name: 'Board',
    component: Board,
    beforeEnter: (to, from, next) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          next();
        } else {
          next('/signin');
        }
      });
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
  },
];

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes,
});

export default router;
