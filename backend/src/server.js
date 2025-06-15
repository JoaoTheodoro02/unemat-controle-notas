// Importa o framework Express para criar o servidor
import express from 'express'
// Carrega variáveis de ambiente do arquivo .env
import dotenv from 'dotenv'
// Importa as rotas dos alunos
import alunoRoutes from './routes/alunoRoutes.js'

// Inicializa as variáveis de ambiente
dotenv.config()
// Cria uma instância do servidor Express
const app = express()

// Habilita o uso de JSON no corpo das requisições
app.use(express.json())

// Define as rotas com prefixo /api/alunos
app.use('/api/alunos', alunoRoutes)

// Define a porta do servidor (do .env ou padrão 3001)
const PORT = process.env.PORT || 3001

// Inicia o servidor e exibe mensagem no console
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
