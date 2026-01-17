import * as clienteRepository from '../repositories/clienteRepository.js'

export async function cadastrar_usuario(dados) {
    const result = await clienteRepository.cadastrar_usuario(dados)
    return result.rows[0]
}

export async function listar_usuarios() {
    const result = await clienteRepository.listar_usuarios()
    return result.rows
}

export async function buscar_usuario(id) {
    const result = await  clienteRepository.buscar_usuario(id)
    return  result.rows[0] || null
}


export async function deletar_usuario(id) {
    const result = await clienteRepository.deletar_usuario(id)
    return result.rows[0] 
}

export async function atualizar_name(id, nameUsers) {
    const result = await clienteRepository.atualizar_name(id, nameUsers)
    return result.rows[0]
}