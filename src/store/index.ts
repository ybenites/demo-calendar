import Vue from "vue";
import Vuex from "vuex";

import { EventModule } from './modules/EventModule';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    EventModule
  },
});
