import * as livroService from '../services/livroService.js'

export async function cadastrar_livro(req, res) {
  try {
    const livro = await livroService.cadastrar_livro(req.body)
    return res.status(201).json(livro)
  } catch (err) {
    return res.status(400).json({ erro: err.message })
  }
}

export async function listar_livros(req, res) {
  try {
    const livros = await livroService.listar_livros()
    return res.status(200).json(livros)
  } catch (err) {
    return res.status(500).json({ erro: err.message })
  }
}

export async function buscar_livro(req, res) {
  try {
    const livro = await livroService.buscar_livro(req.params.id)
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' })
    return res.status(200).json(livro)
  } catch (err) {
    return res.status(400).json({ erro: err.message })
  }
}

export async function deletar_livro(req, res) {
  try {
    const livro = await livroService.deletar_livro(req.params.id)
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' })
    return res.status(200).json(livro)
  } catch (err) {
    return res.status(400).json({ erro: err.message })
  }
}

export async function atualizar_titulo(req, res) {
  try {
    const livro = await livroService.atualizar_titulo(req.params.id, req.body.titulo)
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' })
    return res.status(200).json(livro)
  } catch (err) {
    return res.status(400).json({ erro: err.message })
  }
}

export async function adicionar_quantidade(req, res) {
  try {
    const livro = await livroService.adicionar_quantidade(req.params.id, req.body.quantidade)
    if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' })
    return res.status(200).json(livro)
  } catch (err) {
    return res.status(400).json({ erro: err.message })
  }
}
