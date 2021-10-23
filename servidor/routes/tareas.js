const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

const auth = require('../middleware/auth');
const tareasController = require('../controllers/tareasController');

router.get('/', 
    auth,
    tareasController.obtenerTareas
);

router.post('/',
    auth,
    [
        check('nombre', 'El nombre de la tarea es requerido').trim().not().isEmpty()
    ],
    tareasController.crearTarea
);

router.put('/:id', 
    auth,
    [
        check('nombre', 'El nombre de la tarea es requerido').trim().not().isEmpty()
    ],
    tareasController.actualizarTarea
);

router.delete('/:id',
    auth,   
    tareasController.eliminarTarea
);

module.exports = router;