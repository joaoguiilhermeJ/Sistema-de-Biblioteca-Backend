import * as emprestimoRepository from '../repositories/emprestimoRepository.js'

function validar_id(valor, nomeCampo) {
  const numero = Number(valor)
  if (!Number.isInteger(numero) || numero <= 0) throw new Error(`${nomeCampo} inválido`)
  return numero
}

export async function emprestar_livro(dados) {
  const idUser = validar_id(dados.idUser, 'idUser')
  const idBook = validar_id(dados.idBook, 'idBook')

  const usuarioExiste = await emprestimoRepository.usuario_existe(idUser)
  if (!usuarioExiste) throw new Error('Usuário não encontrado')

  const livroExiste = await emprestimoRepository.livro_existe(idBook)
  if (!livroExiste) throw new Error('Livro não encontrado')

  const estoque = await emprestimoRepository.obter_estoque(idBook)
  if (estoque === null) throw new Error('Livro não encontrado')
  if (estoque <= 0) throw new Error('Livro sem estoque')

  const totalEmMao = await emprestimoRepository.obter_total_em_mao(idUser)
  if (totalEmMao === null) throw new Error('Usuário não encontrado')
  if (totalEmMao >= 5) throw new Error('Usuário já está no limite de 5 livros')

  await emprestimoRepository.emprestar_livro(idUser, idBook)

  return { mensagem: 'Empréstimo realizado com sucesso', idUser, idBook }
}

export async function devolver_livro(dados) {
  const idUser = validar_id(dados.idUser, 'idUser')
  const idBook = validar_id(dados.idBook, 'idBook')

  const usuarioExiste = await emprestimoRepository.usuario_existe(idUser)
  if (!usuarioExiste) throw new Error('Usuário não encontrado')

  const livroExiste = await emprestimoRepository.livro_existe(idBook)
  if (!livroExiste) throw new Error('Livro não encontrado')

  await emprestimoRepository.devolver_livro(idUser, idBook)

  return { mensagem: 'Devolução realizada com sucesso', idUser, idBook }
}

export async function listar_emprestimos_abertos() {
  return await emprestimoRepository.listar_emprestimos_abertos()
}
