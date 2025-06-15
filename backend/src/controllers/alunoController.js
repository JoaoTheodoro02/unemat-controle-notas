// Importa as funções do serviço de aluno
import { listarAlunos, criarAluno } from '../services/alunoService.js'

// Controlador para buscar todos os alunos
export async function getAlunos(req, res) {
  try {
    const alunos = await listarAlunos() // Chama a função que consulta os alunos no banco
    res.json(alunos) // Retorna a lista em formato JSON
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar alunos' }) // Retorna erro interno do servidor
  }
}

// Controlador para criar um novo aluno
export async function createAluno(req, res) {
  const { nome, email } = req.body // Extrai nome e email do corpo da requisição
  try {
    const resultado = await criarAluno({ nome, email }) // Cria aluno no banco
    res.status(201).json({ id: resultado.insertId, nome, email }) // Retorna sucesso com dados criados
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar aluno' }) // Retorna erro interno do servidor
  }
}
