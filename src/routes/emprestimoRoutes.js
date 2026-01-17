import { Router } from 'express'
import * as emprestimoController from '../controllers/emprestimoController.js'

const router = Router()

router.post('/emprestimos', emprestimoController.emprestar)
router.post('/emprestimos/devolucao', emprestimoController.devolver)
router.get('/emprestimos/abertos', emprestimoController.listar_abertos)

export default router
