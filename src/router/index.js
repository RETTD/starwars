import Vue from "vue";
import VueRouter from "vue-router";
import HelloWorld from "../components/HelloWorld";
import Person from ".//Person";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HelloWorld,
    params: {},
  },
  {
    path: "/person",
    name: "Person",
    component: Person,
    params: {},
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
