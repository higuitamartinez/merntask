const Usuario = require('../models/Usuario');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

exports.crearUsuario = async (req, res) => {
    //1. Validar con express-validator
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    //Crear el usuario
    try{
        //1. Existencia   
        let usuario = await Usuario.findOne({
            email: req.body.email
        });

        if(usuario){
            return res.status(400).json({msg: 'El usuario ya existe'});
        }

        //2. Instancia
        usuario = new Usuario(req.body);

        //3. Encriptación
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);

        await usuario.save();
        res.status(200).json({msg: 'Usuario creado correctamente'});
    }catch(error){
        console.log(error);
        res.status(500).json({msg:'Hubo un Error en el servidor'});
    }
}