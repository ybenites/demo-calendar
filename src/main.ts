import Es6Promise from 'es6-promise'
Es6Promise.polyfill();

import "core-js/stable";
import "regenerator-runtime/runtime";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vSelect from 'vue-select';
import 'bootstrap/scss/bootstrap.scss';
import 'vue-select/dist/vue-select.css';

Vue.component('v-select', vSelect);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
