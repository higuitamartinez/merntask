const {validationResult} = require('express-validator');
const Proyecto = require('../models/Proyecto');
const Tarea = require('../models/Tarea');

exports.obtenerTareas = async (req, res) => {
    const {proyecto} = req.query;
    try{
        const existeProyecto = await Proyecto.findById(proyecto);
        //1. Existencia del proyecto
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }
        
        //Coordinación del id del usuario
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'Acción prohibida'});
        }
        const tareas = await Tarea.find({
            proyecto
        });
        res.status(200).json({tareas});
    }catch(error){  
        console.log(error);
        res.status(500).send('Ocurrió un error en el servidor');
    }
}

exports.crearTarea = async (req, res) => {
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    const {proyecto} = req.body;
    try{
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'Acción prohibida'});
        }

        const tarea = new Tarea(req.body);
        await tarea.save();
        res.status(200).json({tarea});
    }catch(error){  
        console.log(error);
        res.status(500).send('Ocurrió un error en el servidor');
    }
}

exports.actualizarTarea = async(req, res) => {
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    const {nombre, estado} = req.body;
    try{
        const tarea = await Tarea.findById(req.params.id);
        if(!tarea){
            return res.status(404).json({msg: 'Tarea no encontrada'});
        }

        const existeProyecto = await Proyecto.findById(tarea.proyecto);

        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'Acción prohibida'});
        }

        tarea.nombre = nombre;
        tarea.estado = estado;
        await tarea.save();
        res.status(200).json({tarea});
    }catch(error){  
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

exports.eliminarTarea = async (req, res) => {
    try{
        const tarea = await Tarea.findById(req.params.id);
        if(!tarea){
            return res.status(404).json({msg: 'Tarea no encontrada'});
        }
        const existeProyecto = await Proyecto.findById(tarea.proyecto);

        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'Acción Prohibida'});
        }

        await Tarea.findOneAndDelete({
            _id: tarea._id
        });
        res.status(200).json({msg: 'Tarea eliminada correctamente'});
    }catch(error){
        console.log(error);
        res.status(500).send('Ocurrió un error en el servidor');
    }
}