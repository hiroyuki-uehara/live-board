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

// const firebaseConfig = {
//   apiKey: 'AIzaSyCfj4uZ6rPSsIM8PtpP_RJq97YBkG5SqCE',
//   authDomain: 'live-board-80d7b.firebaseapp.com',
//   projectId: 'live-board-80d7b',
//   storageBucket: 'live-board-80d7b.appspot.com',
//   messagingSenderId: '637736999167',
//   appId: '1:637736999167:web:03b0e4f4a9a06ed1b114ca',
// };

const firebaseConfig = {
  apiKey: 'AIzaSyADsrkGNj0i6S3ARBL0ewy7nMIvGCo1-k0',
  authDomain: 'live-board-plus.firebaseapp.com',
  databaseURL: 'https://live-board-plus-default-rtdb.firebaseio.com',
  projectId: 'live-board-plus',
  storageBucket: 'live-board-plus.appspot.com',
  messagingSenderId: '646656968844',
  appId: '1:646656968844:web:2cf8cc66fe4b36214453a9',
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
