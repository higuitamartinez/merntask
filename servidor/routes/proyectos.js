const express = require('express');
const router = express.Router();
const proyectosController = require('../controllers/proyectosController');
const auth = require('../middleware/auth');

const {check} = require('express-validator');

router.get('/',
    auth,
    proyectosController.obtenerProyectos
)

router.post('/',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').trim().not().isEmpty()
    ]
    ,proyectosController.crearProyecto
);

router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre del proyecto es requerido').trim().not().isEmpty()
    ],  
    proyectosController.actualizarProyecto
);


router.delete('/:id', 
    auth,   
    proyectosController.eliminarProyecto
);


module.exports = router;