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
import { faGithub, faBitbucket, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faBell, faPlusCircle } from '@fortawesome/pro-regular-svg-icons';
import { faTrashAlt, faQuestionCircle } from '@fortawesome/pro-light-svg-icons';
import { faCoffee } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Gravatar from 'vue-gravatar';

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const firebaseConfig = {
  apiKey: 'AIzaSyDUHjJmnJLPkwrScGiAY3luHewFDj6bldA',
  authDomain: 'live-board-1868b.firebaseapp.com',
  projectId: 'live-board-1868b',
  storageBucket: 'live-board-1868b.appspot.com',
  messagingSenderId: '2037367130',
  appId: '1:2037367130:web:6db35f07da52cf17e67363',
};

firebase.initializeApp(firebaseConfig);

library.add(
  faChalkboard,
  faCircle,
  faReply,
  faWindowClose,
  faEdit,
  faGithub,
  faBell,
  faPlusCircle,
  faTrashAlt,
  faQuestionCircle,
  faCoffee,
  faYoutube,
  faBitbucket
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('v-gravatar', Gravatar);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
