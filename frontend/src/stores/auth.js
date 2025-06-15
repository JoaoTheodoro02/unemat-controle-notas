import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '../firebase/config' // << AQUI ESTÁ A CHAVE DO SUCESSO
import router from '../router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    authReady: false,
  }),
  actions: {
    async register(email, password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user
        router.push('/dashboard')
      } catch (error) {
        console.error('Erro no registro:', error.message)
        throw error
      }
    },
    async login(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user
        router.push('/dashboard')
      } catch (error) {
        console.error('Erro no login:', error.message)
        throw error
      }
    },
    async logout() {
      try {
        await signOut(auth)
        this.user = null
        router.push('/login')
      } catch (error) {
        console.error('Erro ao fazer logout:', error.message)
      }
    },
    initAuth() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          this.user = user
          this.authReady = true
          resolve()
        })
      })
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
})
