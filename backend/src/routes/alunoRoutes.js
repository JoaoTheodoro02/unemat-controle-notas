import express from 'express'
import { getAlunos, createAluno } from '../controllers/alunoController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', verifyToken, getAlunos)
router.post('/', verifyToken, createAluno)

export default router
