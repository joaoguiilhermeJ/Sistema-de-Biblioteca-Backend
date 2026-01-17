import * as emprestimoService from '../services/emprestimoService.js'

export async function emprestar(req, res) {
  try {
    const resultado = await emprestimoService.emprestar_livro(req.body)
    return res.status(201).json(resultado)
  } catch (err) {
    return res.status(400).json({ erro: err.message })
  }
}

export async function devolver(req, res) {
  try {
    const resultado = await emprestimoService.devolver_livro(req.body)
    return res.status(200).json(resultado)
  } catch (err) {
    return res.status(400).json({ erro: err.message })
  }
}

export async function listar_abertos(req, res) {
  try {
    const emprestimos = await emprestimoService.listar_emprestimos_abertos()
    return res.status(200).json(emprestimos)
  } catch (err) {
    return res.status(500).json({ erro: err.message })
  }
}
