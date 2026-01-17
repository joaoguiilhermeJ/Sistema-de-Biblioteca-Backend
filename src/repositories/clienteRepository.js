import pool from '../config/database.js'

export async function inserir_cliente(dados) {
    return pool.query(
        `INSERT INTO users (nomeUsers, cpf) VALUES ($1, $2) RETURNING *`,
        [dados.nome, dados.cpf]
    );
}

export async function listar_Todosclientes() {
    return pool.query('SELECT * FROM users')
}

export async function buscar_porID(id) {
    return pool.query(`SELECT * FROM users WHERE idUsers = $1
`, [id])
}

export async function deletar_usuario(id) {
    return pool.query(`DELETE FROM users WHERE idUsers = $1 RETURNING *`, [id])
}

export async function update_name(id, nameUsers) {
    return pool.query(`UPDATE users SET nameUsers = $1 WHERE idUsers = $2 RETURNING *`,
        [nameUsers,id]
    )
}