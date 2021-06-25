import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    areaList: [],
  },
  mutations: {
    setAreaList(state, payload) {
      state.areaList = payload;
    },
  },
  actions: {
    fetchAllAreas({ commit }) {
      return new Promise((resolve, reject) => {
        get("/areas")
          .then(({ data }) => {
            commit("setAreaList", data.areas);
            resolve(data.areas);
          })
          .catch((err) => reject(err));
      });
    },
  },
});
