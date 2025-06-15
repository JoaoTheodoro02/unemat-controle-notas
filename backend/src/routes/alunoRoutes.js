// Importa o Express para criar as rotas
import express from 'express'

// Importa os controladores responsáveis pelas ações com alunos
import { getAlunos, createAluno } from '../controllers/alunoController.js'

// Importa o middleware de autenticação (verificação de token)
import { verifyToken } from '../middleware/authMiddleware.js'

// Cria o roteador do Express
const router = express.Router()

// Rota GET para listar alunos - protegida por verificação de token
router.get('/', verifyToken, getAlunos)

// Rota POST para criar um novo aluno - protegida por verificação de token
router.post('/', verifyToken, createAluno)

// Exporta o roteador para ser usado no app principal
export default router
