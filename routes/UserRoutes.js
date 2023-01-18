const router = require('express').Router();

const UserController = require('../controllers/UserController.js');

const verifyToken = require('../helpers/verify-token');

router.post('/sign_up', UserController.sign_up);
router.post('/sign_in', UserController.sign_in);
router.get('/buscar_usuario/:user_id', verifyToken, UserController.buscar_usuario);
router.delete('/deletar_usuario/:user_id', verifyToken, UserController.deletar_usuario);
router.patch('/atualizar_usuario/:user_id', verifyToken, UserController.atualizar_usuario);

module.exports = router;