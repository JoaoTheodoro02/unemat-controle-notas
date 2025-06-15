
import { db } from '../config/database.js'

export async function listarAlunos() {
  const [rows] = await db.query('SELECT * FROM alunos')
  return rows
}

export async function criarAluno({ nome, email }) {
  const [result] = await db.query('INSERT INTO alunos (nome, email) VALUES (?, ?)', [nome, email])
  return result
}
