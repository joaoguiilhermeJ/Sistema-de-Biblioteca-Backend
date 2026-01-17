import * as livroRepository from '../repositories/livroRepository.js'

export async function cadastrar_livro(dados) {
  const titulo = String(dados.titulo ?? '').trim()
  const autor = String(dados.autor ?? '').trim()
  const quantidade = Number(dados.quantidade)

  if (!titulo) throw new Error('titulo é obrigatório')
  if (!autor) throw new Error('autor é obrigatório')
  if (!Number.isInteger(quantidade) || quantidade < 0) throw new Error('quantidade inválida')

  const result = await livroRepository.cadastrar_livro({ titulo, autor, quantidade })
  return result.rows[0]
}

export async function listar_livros() {
  const result = await livroRepository.listar_livros()
  return result.rows
}

export async function buscar_livro(id) {
  const idBook = Number(id)
  if (!Number.isInteger(idBook) || idBook <= 0) throw new Error('ID inválido')

  const result = await livroRepository.buscar_livro(idBook)
  return result.rows[0]
}

export async function deletar_livro(id) {
  const idBook = Number(id)
  if (!Number.isInteger(idBook) || idBook <= 0) throw new Error('ID inválido')

  const result = await livroRepository.deletar_livro(idBook)
  return result.rows[0]
}

export async function atualizar_titulo(id, tituloBook) {
  const idBook = Number(id)
  const titulo = String(tituloBook ?? '').trim()

  if (!Number.isInteger(idBook) || idBook <= 0) throw new Error('ID inválido')
  if (!titulo) throw new Error('titulo é obrigatório')

  const result = await livroRepository.atualizar_titulo(idBook, titulo)
  return result.rows[0]
}

export async function adicionar_quantidade(id, quantidade) {
  const idBook = Number(id)
  const qtd = Number(quantidade)

  if (!Number.isInteger(idBook) || idBook <= 0) throw new Error('ID inválido')
  if (!Number.isInteger(qtd) || qtd <= 0) throw new Error('Quantidade inválida')

  const livro = await livroRepository.adicionar_quantidade(idBook, qtd)
  return livro
}
