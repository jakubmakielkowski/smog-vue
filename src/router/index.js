import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/information",
    name: "Information",
    component: () => import("@/views/InformationView")
  },
  {
    path: "/saved-stations",
    name: "Saved stations",
    component: () => import("@/views/SavedStationsView")
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views/SearchView")
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/SettingsView")
  },
  {
    path: "/station/:stationId",
    name: "Station",
    component: () => import("@/views/StationView"),
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
