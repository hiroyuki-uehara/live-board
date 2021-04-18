import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChalkboard, faCircle, faReply } from '@fortawesome/free-solid-svg-icons';
import { faWindowClose, faEdit } from '@fortawesome/free-regular-svg-icons';
import { faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faHomeAlt } from '@fortawesome/pro-solid-svg-icons';
import { faPlusCircle, faHospitalAlt } from '@fortawesome/pro-regular-svg-icons';
import { faTrashAlt, faQuestionCircle, faCheckSquare } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Gravatar from 'vue-gravatar';

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const firebaseConfig = {
  apiKey: 'AIzaSyBF6A-va0G5iF9Lax3MEvqrZD8DQjk90cM',
  authDomain: 'live-board-1c903.firebaseapp.com',
  databaseURL: 'https://live-board-1c903-default-rtdb.firebaseio.com',
  projectId: 'live-board-1c903',
  storageBucket: 'live-board-1c903.appspot.com',
  messagingSenderId: '11580769067',
  appId: '1:11580769067:web:477fd46465c1261fe23b6e',
};

firebase.initializeApp(firebaseConfig);

library.add(
  faChalkboard,
  faCircle,
  faReply,
  faWindowClose,
  faEdit,
  faGithub,
  faPlusCircle,
  faTrashAlt,
  faQuestionCircle,
  faYoutube,
  faHospitalAlt,
  faCheckSquare,
  faHomeAlt
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('v-gravatar', Gravatar);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
