import Vue from "vue";
import Vuex from "vuex";
import squad from "../dummy/squad";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    areaList: [],
    squadList: [],
    competitionList: [],
    globalLoading: false,
  },
  mutations: {
    setAreaList(state, payload) {
      state.areaList = payload;
    },
    setSquadList(state, payload) {
      state.squadList = payload;
    },
    setCompetitionList(state, payload) {
      state.competitionList = payload;
    },
    setGlobalLoading(state) {
      state.globalLoading = !state.globalLoading;
    },
  },
  actions: {
    fetchAllAreas({ commit, dispatch }) {
      dispatch("fetchSquad");
      return new Promise((resolve, reject) => {
        commit("setGlobalLoading");
        get("/areas")
          .then(({ data }) => {
            commit("setAreaList", data.areas);
            return get(`/competitions`);
          })
          .then(({ data }) => {
            commit("setCompetitionList", data.competitions);
            resolve(true);
          })
          .catch((err) => reject(err))
          .finally(() => commit("setGlobalLoading"));
      });
    },
    fetchSquad({ commit }) {
      commit("setSquadList", squad);
    },
  },
});
