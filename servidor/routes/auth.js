const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/', 
    [
        check('email', 'Agrega un email válido').trim().isEmail(),
        check('password', 'El password es requerido').trim().not().isEmpty()
    ],
    authController.autenticarUsuario
);

router.get('/',
    auth,
    authController.obtenerUsuario
);

module.exports = router;