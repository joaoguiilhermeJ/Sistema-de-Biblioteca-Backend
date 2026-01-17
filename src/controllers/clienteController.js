import * as clienteService from '../services/clienteService.js'

export async function cadastrar_usuario
(req, res) {
    try {
        const cliente = await clienteService.criar_clientes(req.body)
        return res.status(201).json(cliente)
    } catch(err) {
        return res.status(400).json({ erro: err.message })
    }  
}

export async function listar_usuarios(req, res) {
    try{
        const clientes = await clienteService.listar_clientes()
        return res.status(200).json(clientes)
    } catch (err) {
        return res.status(500).json({ erro: err.message})
    }
}

export async function buscar_usuario(req, res) {
    try {
        const id = Number(req.params.id)
        const cliente = await clienteService.buscar_clientes(id)

        if (!cliente) {
            return res.status(404).json({ erro: 'Cliente não encontrado'})
        }

        return res.status(200).json(cliente)
    } catch (err) {
        return res.status(500).json({ erro: err.message})
    }
    
}

export async function deletar_usuario(req, res) {
    try {
        const id = Number(req.params.id)
        const cliente = await clienteService.deletar_dados(id)

        if (!cliente){
            return res.status(404).json({ erro: 'Cliente não encontrado'})
        }

        return res.status(200).json(cliente)
    } catch (err) {
        return res.status(500).json({ erro: err.message})
    }
}

export async function atualizar_name(req, res) {
  try {
    const id = Number(req.params.id)
    const nomeUsers = String(req.body.nomeUsers ?? '').trim()

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ erro: 'ID inválido' })
    }

    if (!nomeUsers) {
      return res.status(400).json({ erro: 'nomeUsers é obrigatório' })
    }

    const cliente = await clienteService.atualizar_name(id, nomeUsers)

    if (!cliente) {
      return res.status(404).json({ erro: 'Cliente não encontrado' })
    }

    return res.status(200).json(cliente)
  } catch (err) {
    return res.status(500).json({ erro: err.message })
  }
}
