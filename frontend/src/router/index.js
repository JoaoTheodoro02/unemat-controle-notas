// src/router/index.js

// Importa funções do Vue Router
import { createRouter, createWebHistory } from 'vue-router'
// Importa o store de autenticação
import { useAuthStore } from '../stores/auth'

// Define as rotas da aplicação
const routes = [
  {
    path: '/', // Caminho raiz
    redirect: '/login', // Redireciona para a página de login
  },
  {
    path: '/login', // Rota de login
    name: 'Login',
    component: () => import('../views/LoginView.vue'), // Carrega a view de login
    meta: { requiresAuth: false }, // Não requer autenticação
  },
  {
    path: '/register', // Rota de registro
    name: 'Register',
    component: () => import('../views/RegisterView.vue'), // Carrega a view de registro
    meta: { requiresAuth: false }, // Não requer autenticação
  },
  {
    path: '/dashboard', // Rota do painel principal
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'), // Carrega a view do dashboard
    meta: { requiresAuth: true }, // Requer autenticação
  },
  {
    path: '/disciplinas', // Rota de disciplinas
    name: 'Disciplinas',
    component: () => import('../views/DisciplinasView.vue'), // Carrega a view de disciplinas
    meta: { requiresAuth: true }, // Requer autenticação
  },
  {
    path: '/disciplina/:id', // Rota de detalhe da disciplina
    name: 'DetalheDisciplina',
    component: () => import('../views/DetalheDisciplinaView.vue'), // Carrega a view de detalhes
    props: true, // Permite passar o ID como propriedade
    meta: { requiresAuth: true }, // Requer autenticação
  },
  {
    path: '/:pathMatch(.*)*', // Rota coringa para páginas não encontradas (404)
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'), // View de página não encontrada
  },
]

// Cria a instância do roteador
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Usa o modo de histórico
  routes, // Passa as rotas definidas acima
})

// Proteção de rotas (Navigation Guard)
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore() // Acessa o store de autenticação

  // Aguarda a autenticação estar pronta
  if (!authStore.authReady) {
    await authStore.initAuth()
  }

  const isAuthenticated = authStore.isAuthenticated // Verifica se o usuário está logado
  const requiresAuth = to.meta.requiresAuth // Verifica se a rota exige autenticação

  if (requiresAuth && !isAuthenticated) {
    // Se a rota exige login e o usuário não está logado, redireciona para o login
    next('/login')
  } else if (!requiresAuth && isAuthenticated && (to.name === 'Login' || to.name === 'Register')) {
    // Se o usuário já está logado e tenta acessar login ou registro, redireciona para o dashboard
    next('/dashboard')
  } else {
    // Caso contrário, segue para a rota solicitada
    next()
  }
})

export default router // Exporta o roteador para uso no app
