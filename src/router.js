import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import Search from "./views/Search.vue";
import Browse from "./views/Browse.vue";
import Download from "./views/Download.vue";
import Predict from "./views/Predict.vue";
import PredictResult from "./views/PredictResult.vue";
import Links from "./views/Links.vue";
import Help from "./views/Help.vue";
import PUL from "./views/PUL.vue";
import BrowseTable from "./views/BrowseTable.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: "Home - Sift-PULs",
      },
    },
    {
      path: "/search",
      name: "search",
      component: Search,
      meta: {
        title: "Search - Sift-PULs",
      },
    },
    {
      path: "/browse",
      name: "browse",
      component: Browse,
      meta: {
        title: "Browse - Sift-PULs",
      },
    },
    {
      path: "/download",
      name: "download",
      component: Download,
      meta: {
        title: "Download - Sift-PULs",
      },
    },
    {
      path: "/predict",
      name: "predict",
      component: Predict,
    },
    {
      path: "/predict/:token",
      name: "predict-result",
      component: PredictResult,
    },
    {
      path: "/predict/:token/puls/:pul_id",
      name: "predict-pul",
      component: PUL,
      meta: {
        title: "PUL Details - Sift-PULs",
      },
    },
    {
      path: "/links",
      name: "links",
      component: Links,
      meta: {
        title: "Links - Sift-PULs",
      },
    },
    {
      path: "/help",
      name: "help",
      component: Help,
      meta: {
        title: "Help - Sift-PULs",
      },

      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: "/pul/:pul_id",
      name: "pul",
      component: PUL,
      meta: {
        title: "PUL Details - Sift-PULs",
      },
    },
    {
      path: "/browse/:field/:value",
      name: "browsetable",
      component: BrowseTable,
      meta: {
        title: "Browse - Sift-PULs",
      },
    },
  ],
});
