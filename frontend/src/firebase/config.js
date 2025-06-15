import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyC3Rnxd5j_Ld0iAANzEAzyBNBb5Rw-tBV8',
  authDomain: 'unemat-controle-notas.firebaseapp.com',
  projectId: 'unemat-controle-notas',
  storageBucket: 'unemat-controle-notas.appspot.com',
  messagingSenderId: '125719137513',
  appId: '1:125719137513:web:8a17232e0033cb6b0bf478',
}

// ✅ Verifica se já existe app Firebase inicializado
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)

export { app, auth }
