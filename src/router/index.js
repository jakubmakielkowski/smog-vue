import Vue from "vue";
import VueRouter from "vue-router";

import SearchView from "@/views/SearchView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/search",
    name: "Search",
    component: SearchView
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
