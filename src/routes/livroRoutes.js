import { Router } from 'express'
import * as livroController from '../controllers/livroController.js'

const router = Router()

router.post('/livros', livroController.cadastrar_livro)
router.get('/livros', livroController.listar_livros)
router.get('/livros/:id', livroController.buscar_livro)
router.delete('/livros/:id', livroController.deletar_livro)
router.put('/livros/:id/titulo', livroController.atualizar_titulo)
router.patch('/livros/:id/quantidade', livroController.adicionar_quantidade)

export default router
