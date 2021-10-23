const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

const {check} = require('express-validator');

router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').trim().not().isEmpty(),
        check('email', 'Agrega un email válido').trim().isEmail(),
        check('password', 'El password debe ser mínimo de 6 caracteres').trim().isLength({min: 6})
    ],
    usuariosController.crearUsuario
)

module.exports = router;

