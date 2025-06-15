
import { listarAlunos, criarAluno } from '../services/alunoService.js'

export async function getAlunos(req, res) {
  try {
    const alunos = await listarAlunos()
    res.json(alunos)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar alunos' })
  }
}

export async function createAluno(req, res) {
  const { nome, email } = req.body
  try {
    const resultado = await criarAluno({ nome, email })
    res.status(201).json({ id: resultado.insertId, nome, email })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar aluno' })
  }
}
