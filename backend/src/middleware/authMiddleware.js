// Importa a instância do Firebase Admin configurada
import admin from '../config/firebaseAdmin.js'

// Middleware para verificar o token JWT enviado na requisição
export async function verifyToken(req, res, next) {
  // Extrai o token do cabeçalho Authorization (formato: Bearer <token>)
  const token = req.headers.authorization?.split(' ')[1]

  // Se não houver token, retorna erro de não autorizado
  if (!token) return res.status(401).json({ error: 'Token ausente' })

  try {
    // Verifica se o token é válido com o Firebase
    const decoded = await admin.auth().verifyIdToken(token)

    // Salva os dados do usuário decodificados na requisição
    req.user = decoded

    // Continua para o próximo middleware ou rota
    next()
  } catch (err) {
    // Token inválido ou expirado
    res.status(403).json({ error: 'Token inválido' })
  }
}
