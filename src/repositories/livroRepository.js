import pool from "../config/database.js";

export async function cadastrar_livro(dados) {
    return pool.query(
        `INSERT INTO livros (titulo,autor, quantidade) VALUES ($1, $2, $3) RETURNING *`,
        [dados.titulo, dados.autor, dados.quantidade]
    )
}

export async function listar_livros() {
    return pool.query(
        `SELECT * FROM livros`
    )
}

export async function buscar_livro(id) {
    return pool.query(
        `SELECT * FROM livros WHERE idBook = $1`,
        [id]
    )
}

export async function deletar_livro(id) {
    return pool.query(
        `DELETE FROM livros WHERE idBook = $1 RETURNING *`, [id]
    )
}

export async function atualizar_titulo(id, tituloBook) {
    return pool.query(
        `UPDATE livros SET titulo = $1 WHERE idBook = $2 RETURNING *`,
        [tituloBook,  id]
    )
}

export async function adicionar_quantidade(idBook, quantidade) {
  const query = `
    UPDATE livros
    SET quantidade = quantidade + $1
    WHERE idBook = $2
    RETURNING *
  `

  const result = await pool.query(query, [quantidade, idBook])
  return result.rows[0]
}
