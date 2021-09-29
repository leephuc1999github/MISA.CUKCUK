import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//Views
import InventoryItem from "../components/views/InventoryItem.vue";
import Dashboard from "../components/views/Dashboard.vue";

const routes = [
  { path: "/", component: InventoryItem },
  { path: "/dashboard", component: Dashboard },
];

const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: "active", // active class for non-exact links.
  linkExactActiveClass: "active" // active class for *exact* links.
});

export default router;