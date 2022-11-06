import { createRouter, createWebHashHistory } from "vue-router";

const HomeView = () => import("@/views/HomeView");
const PatientsView = () => import("@/views/PatientsView");

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/patients",
    name: "Patients",
    component: PatientsView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
