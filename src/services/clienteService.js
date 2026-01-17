import * as clienteRepository from '../repositories/clienteRepository.js'

export async function criar_clientes(dados) {
    const result = await clienteRepository.inserir_cliente(dados)
    return result.rows[0]
}

export async function listar_clientes() {
    const result = await clienteRepository.listar_Todosclientes()
    return result.rows
}

export async function buscar_clientes(id) {
    const result = await  clienteRepository.buscar_porID(id)
    return  result.rows[0] || null
}


export async function deletar_dados(id) {
    const result = await clienteRepository.deletar_usuario(id)
    return result.rows[0] 
}

export async function atualizar_name(id, nameUsers) {
    const result = await clienteRepository.update_name(id)
    return result.rows[0]
}