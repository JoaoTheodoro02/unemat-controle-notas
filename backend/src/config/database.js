// Importa a biblioteca mysql2 com suporte a Promises
import mysql from 'mysql2/promise'

// Importa a biblioteca dotenv para lidar com variáveis de ambiente
import dotenv from 'dotenv'

// Carrega as variáveis do arquivo .env para process.env
dotenv.config()

// Cria uma pool de conexões com o banco de dados usando os dados do .env
export const db = mysql.createPool({
  host: process.env.DB_HOST, // Endereço do host do banco (ex: localhost)
  user: process.env.DB_USER, // Usuário do banco
  password: process.env.DB_PASS, // Senha do banco
  database: process.env.DB_NAME, // Nome do banco de dados
})
