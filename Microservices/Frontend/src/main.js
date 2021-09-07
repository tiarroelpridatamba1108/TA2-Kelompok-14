if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import firebase from 'firebase/app';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import { setHeaderToken } from '../utils/auth';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

axios.defaults.baseURL = 'http://localhost:8000/api/user';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = [
  'GET',
  'POST',
  'PUT',
  'OPTIONS',
  'HEAD',
  'DELETE',
  'TRACE',
  'CONNECT',
];
axios.defaults.headers.common['Access-Control-Allow-Headers'] = [
  'Accept',
  'Accept-Version',
  'Content-Length',
  'Content-MD5',
  'Content-Type',
  'Date',
  'X-Auth-Token',
];

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueToast);
Vue.config.productionTip = false;

const token = localStorage.getItem('token');

if (token) {
  setHeaderToken(token);
}

store
  .dispatch('get_user', token)
  .then(() => {
    new Vue({
      router,
      store,
      render: (h) => h(App),
      created() {
        firebase.initializeApp({
          apiKey: process.env.VUE_APP_API_KEY,
          authDomain: process.env.VUE_APP_AUTH_DOMAIN,
          projectId: process.env.VUE_APP_PROJECT_ID,
          storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
          messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
          appId: process.env.VUE_APP_APP_ID,
        });
      },
    }).$mount('#app');
  })
  .catch((error) => {
    console.error(error);
  });
