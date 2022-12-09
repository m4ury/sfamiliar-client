import { createRouter, createWebHashHistory } from "vue-router";

const HomeView = () => import("@/views/HomeView");
const PatientsView = () => import("@/views/PatientsView");
const FamiliasView = () => import("@/views/FamiliasView");

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
  {
    path: "/familias",
    name: "Familias",
    component: FamiliasView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: "smooth" };
  },
});

export default router;
