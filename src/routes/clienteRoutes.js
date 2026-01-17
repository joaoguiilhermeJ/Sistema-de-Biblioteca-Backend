import {Router} from "express"
import * as clienteController from '../controllers/clienteController.js'

const router = Router()

router.post('/clientes', clienteController.cadastrar_usuario);
router.get('/clientes', clienteController.listar_usuarios);
router.get('/clientes/:id', clienteController.buscar_usuario);
router.delete('/clientes/:id', clienteController.deletar_usuario);
router.put('/clientes/:id', clienteController.atualizar_name);

export default router;
