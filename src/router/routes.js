import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Notas from "../components/Notas.vue";
import Estudentes from "../components/Estudentes.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/estudiante/:idEstudiante/curso/:idCurso/nota", component: Notas },
  { path: "/curso/estudiantes/:idCurso", component: Estudentes },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;