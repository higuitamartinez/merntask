const {validationResult} = require('express-validator');
const Proyecto = require('../models/Proyecto');
const Tarea = require('../models/Tarea');


exports.obtenerProyectos = async (req, res) => {
    const {id} = req.usuario;
    try{
        const proyectos = await Proyecto.find({
            creador: id
        });
        res.status(200).json({proyectos});
    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error en el servidor');
    }
}


exports.crearProyecto = async (req, res) => {
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    try{
        const proyecto = new Proyecto(req.body);
        proyecto.creador = req.usuario.id;
        await proyecto.save();
        res.status(200).json({proyecto});
    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error en el servidor');
    }
}

exports.actualizarProyecto = async (req, res) => {
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    try{
        const proyecto = await Proyecto.findById(req.params.id);
        if(!proyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }
        
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'Acción Prohibida'});
        }
        proyecto.nombre = req.body.nombre;
        await proyecto.save();
        res.status(200).json({proyecto});
    }catch(error){
        console.log(error);
        res.status(500).send('Ocurrió un error en el servidor');
    }
}

exports.eliminarProyecto = async (req, res) => {
    try{
        const proyecto = await Proyecto.findById(req.params.id);
        if(!proyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }
        
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'Acción Prohibida'});
        }
        await Tarea.deleteMany({
            proyecto: proyecto._id
        });

        await Proyecto.findOneAndDelete({
            _id: proyecto._id
        });
        res.status(200).json({msg: 'Proyecto eliminado correctamente'});
    }catch(error){
        console.log(error);
        res.status(500).send('Ocurrió un error en el servidor');
    }
}