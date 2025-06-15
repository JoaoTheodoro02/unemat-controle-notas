// Importa funções para inicializar o Firebase e autenticação
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Configurações do projeto Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyC3Rnxd5j_Ld0iAANzEAzyBNBb5Rw-tBV8', // Chave de API
  authDomain: 'unemat-controle-notas.firebaseapp.com', // Domínio de autenticação
  projectId: 'unemat-controle-notas', // ID do projeto
  storageBucket: 'unemat-controle-notas.appspot.com', // Bucket de armazenamento
  messagingSenderId: '125719137513', // ID do remetente de mensagens
  appId: '1:125719137513:web:8a17232e0033cb6b0bf478', // ID do aplicativo
}

// Verifica se já existe uma instância do Firebase, senão inicializa uma nova
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// Obtém o serviço de autenticação do Firebase
const auth = getAuth(app)

// Exporta o app e o auth para serem usados em outras partes do projeto
export { app, auth }
