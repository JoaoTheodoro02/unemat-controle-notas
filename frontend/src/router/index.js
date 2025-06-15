// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const routes = [
  {
    path: '/',
    redirect: '/login', // Redireciona a raiz para o login
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/disciplinas',
    name: 'Disciplinas',
    component: () => import('../views/DisciplinasView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/disciplina/:id',
    name: 'DetalheDisciplina',
    component: () => import('../views/DetalheDisciplinaView.vue'),
    props: true, // Permite passar o ID como prop (embora usaremos route.params)
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*', // Rota catch-all para 404
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation Guard (Proteção de rotas)
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Esperar a inicialização da autenticação se não estiver pronta
  if (!authStore.authReady) {
    await authStore.initAuth();
  }

  const isAuthenticated = authStore.isAuthenticated;
  const requiresAuth = to.meta.requiresAuth;

  if (requiresAuth && !isAuthenticated) {
    // Se a rota requer autenticação e o usuário não está autenticado, redireciona para o login
    next('/login');
  } else if (!requiresAuth && isAuthenticated && (to.name === 'Login' || to.name === 'Register')) {
    // Se o usuário está autenticado e tenta acessar login/registro, redireciona para o dashboard
    next('/dashboard');
  } else {
    // Caso contrário, permite a navegação
    next();
  }
});

export default router;
