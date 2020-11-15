import Vue from "vue";
import VueRouter from "vue-router";

import InformationView from "@/views/InformationView";
import SavedStationsView from "@/views/SavedStationsView";
import SearchView from "@/views/SearchView";
import SettingsView from "@/views/SettingsView";
import StationView from "@/views/StationView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/information",
    name: "Information",
    component: InformationView
  },
  {
    path: "/saved-stations",
    name: "Saved stations",
    component: SavedStationsView
  },
  {
    path: "/search",
    name: "Search",
    component: SearchView
  },
  {
    path: "/settings",
    name: "Settings",
    component: SettingsView
  },
  {
    path: "/station/:stationId",
    name: "Station",
    component: StationView,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
