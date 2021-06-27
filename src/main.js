import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./styles/global.scss";
import Axios from "axios";

Axios.defaults.baseURL = "https://api.football-data.org/v2";
Axios.defaults.headers["X-Auth-Token"] = "8a5d65f53dbe45d8beda4b8f1177e7eb";

// set global axios
window.get = (...args) => {
  return new Promise((resolve, reject) => {
    Axios.get(...args)
      .then(resolve)
      .catch(reject);
  });
};

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
