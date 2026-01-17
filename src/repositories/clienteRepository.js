import pool from '../config/database.js'

export async function cadastrar_usuario(dados) {
    return pool.query(
        `INSERT INTO users (nomeUsers, cpf) VALUES ($1, $2) RETURNING *`,
        [dados.nome, dados.cpf]
    );
}

export async function listar_usuarios() {
    return pool.query('SELECT * FROM users')
}

export async function buscar_usuario(id) {
    return pool.query(`SELECT * FROM users WHERE idUsers = $1
`, [id])
}

export async function deletar_usuario(id) {
    return pool.query(`DELETE FROM users WHERE idUsers = $1 RETURNING *`, [id])
}

export async function atualizar_name(id, nameUsers) {
    return pool.query(`UPDATE users SET nomeUsers = $1 WHERE idUsers = $2 RETURNING *`,
        [nameUsers,id]
    )
}