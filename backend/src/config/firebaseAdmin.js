// Importa o SDK do Firebase Admin para usar serviços do Firebase no backend
import admin from 'firebase-admin'

// Importa createRequire para usar require em módulos ES (type: module)
import { createRequire } from 'module'

// Cria uma função require compatível com ES Modules
const require = createRequire(import.meta.url)

// Importa as credenciais da conta de serviço (gerado no Firebase Console)
const serviceAccount = require('./serviceAccountKey.json')

// Inicializa o Firebase Admin com as credenciais da conta de serviço
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

// Exporta a instância do Firebase Admin para ser usada em outras partes do projeto
export default admin
