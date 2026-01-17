import pool from '../config/database.js'

export async function usuario_existe(idUser) {
  const result = await pool.query('SELECT 1 FROM users WHERE idUsers = $1', [idUser])
  return result.rowCount > 0
}

export async function livro_existe(idBook) {
  const result = await pool.query('SELECT 1 FROM livros WHERE idBook = $1', [idBook])
  return result.rowCount > 0
}

export async function obter_estoque(idBook) {
  const result = await pool.query('SELECT quantidade FROM livros WHERE idBook = $1', [idBook])
  return result.rows[0]?.quantidade ?? null
}

export async function obter_total_em_mao(idUser) {
  const result = await pool.query('SELECT totalLivrosEmMao FROM users WHERE idUsers = $1', [idUser])
  return result.rows[0]?.totallivrosemmao ?? null
}

export async function emprestar_livro(idUser, idBook) {
  await pool.query('CALL emprestar_livro($1, $2)', [idUser, idBook])
}

export async function devolver_livro(idUser, idBook) {
  await pool.query('CALL devolver_livro($1, $2)', [idUser, idBook])
}

export async function listar_emprestimos_abertos() {
  const result = await pool.query('SELECT * FROM listar_livros_com_users()')
  return result.rows
}
