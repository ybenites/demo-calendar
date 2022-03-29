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

const aHours: any[] = [
  {hour: 0 , name:'12:00 am'},
  {hour: 1 , name:'1:00 am'},
  {hour: 2 , name:'2:00 am'},
  {hour: 3 , name:'3:00 am'},
  {hour: 4 , name:'4:00 am'},
  {hour: 5 , name:'5:00 am'},
  {hour: 6 , name:'6:00 am'},
  {hour: 7 , name:'7:00 am'},
  {hour: 8 , name:'8:00 am'},
  {hour: 9 , name:'9:00 am'},
  {hour: 10 , name:'10:00 am'},
  {hour: 11 , name:'11:00 am'},
  {hour: 12 , name:'12:00 pm'},
  {hour: 13 , name:'13:00 pm'},
  {hour: 14 , name:'14:00 pm'},
  {hour: 15 , name:'15:00 pm'},
  {hour: 16 , name:'16:00 pm'},
  {hour: 17 , name:'17:00 pm'},
  {hour: 18 , name:'18:00 pm'},
  {hour: 19 , name:'19:00 pm'},
  {hour: 20 , name:'20:00 pm'},
  {hour: 21 , name:'21:00 pm'},
  {hour: 22 , name:'22:00 pm'},
  {hour: 23 , name:'23:00 pm'},
];

Vue.prototype.$aHours = aHours;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
