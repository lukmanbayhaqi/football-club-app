import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/competitions",
    name: "Competitions",
    component: () => import("../views/Competitions.vue"),
  },
  {
    path: "/league",
    name: "League",
    component: () => import("../views/League.vue"),
  },
  {
    path: "/clubs",
    name: "Clubs",
    component: () => import("../views/Clubs.vue"),
  },
  {
    path: "/team",
    name: "Team",
    component: () => import("../views/Team.vue"),
  },
  {
    path: "/player",
    name: "Player",
    component: () => import("../views/Player.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
