// Importa a conexão com o banco de dados
import { db } from '../config/database.js'

// Função para listar todos os alunos cadastrados no banco
export async function listarAlunos() {
  const [rows] = await db.query('SELECT * FROM alunos') // Executa a consulta
  return rows // Retorna os resultados encontrados
}

// Função para inserir um novo aluno no banco de dados
export async function criarAluno({ nome, email }) {
  const [result] = await db.query(
    'INSERT INTO alunos (nome, email) VALUES (?, ?)',
    [nome, email] // Substitui os parâmetros de forma segura
  )
  return result // Retorna o resultado da inserção (contém o insertId)
}
