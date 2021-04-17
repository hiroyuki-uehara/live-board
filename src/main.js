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
  apiKey: 'AIzaSyBc3Z73kY23qAUDAA0T9yhlTalU_DysJ3Q',
  authDomain: 'live-board-9ba88.firebaseapp.com',
  projectId: 'live-board-9ba88',
  storageBucket: 'live-board-9ba88.appspot.com',
  messagingSenderId: '632782034664',
  appId: '1:632782034664:web:3fb85d478649a95c299b5d',
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
