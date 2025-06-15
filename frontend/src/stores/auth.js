// Importa função para definir store com Pinia
import { defineStore } from 'pinia'

// Importa funções de autenticação do Firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

// Importa a instância de autenticação do Firebase
import { auth } from '../firebase/config'

// Importa o roteador para redirecionamentos
import router from '../router'

// Define a store de autenticação
export const useAuthStore = defineStore('auth', {
  // Estado inicial
  state: () => ({
    user: null, // Usuário autenticado
    authReady: false, // Sinaliza se a autenticação já foi checada
  }),

  // Ações (funções que alteram o estado)
  actions: {
    // Registra novo usuário com e-mail e senha
    async register(email, password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user // Salva o usuário no estado
        router.push('/dashboard') // Redireciona após login
      } catch (error) {
        console.error('Erro no registro:', error.message)
        throw error // Lança o erro para ser tratado na view
      }
    },

    // Realiza login com e-mail e senha
    async login(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user // Salva o usuário logado
        router.push('/dashboard') // Redireciona para o painel
      } catch (error) {
        console.error('Erro no login:', error.message)
        throw error
      }
    },

    // Realiza logout do usuário
    async logout() {
      try {
        await signOut(auth)
        this.user = null // Limpa o usuário do estado
        router.push('/login') // Redireciona para login
      } catch (error) {
        console.error('Erro ao fazer logout:', error.message)
      }
    },

    // Inicializa a autenticação (verifica se há usuário logado)
    initAuth() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          this.user = user // Define o usuário atual
          this.authReady = true // Sinaliza que já verificou
          resolve() // Continua a execução
        })
      })
    },
  },

  // Getters (valores derivados do estado)
  getters: {
    isAuthenticated: (state) => !!state.user, // Retorna true se tiver usuário
  },
})
