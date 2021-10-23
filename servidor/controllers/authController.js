const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');

exports.autenticarUsuario = async (req, res) => {
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    const {email, password} = req.body;

    try{
        const usuario = await Usuario.findOne({
            email
        });
    
        if(!usuario){
            return res.status(404).json({msg: 'El usuario no existe'});
        }
    
        const comparePassword = await bcrypt.compare(password, usuario.password);
    
        if(!comparePassword){
            return res.status(400).json({msg: 'Password incorrecto'});
        }
    
        //MANEJO DE JSON WEB TOKEN
    
        // 1. El payload
        const payload = {
            usuario:{
                id: usuario._id
            }
        }
    
        //2. jwt.sign para generar el token
            //2.1. Mapeo de payload, .env
            //2.2. expiresIn
            //2.3. (error, token)
        jwt.sign(payload, process.env.SECRETA,{
            expiresIn: 3600
        },(error, token) => {
            if(error){
                throw error;
            }
            res.status(200).json({token})
        });
    }catch(error){
        console.log(error);
        res.status(500).json({msg: 'Hubo un error en el servidor'});
    }
}


exports.obtenerUsuario = async (req, res) => {
    try{
        const usuario = await Usuario.findById(req.usuario.id,{
            email: true,
            nombre: true,
            _id: false
        });
        if(!usuario){
            return res.status(404).json({msg: 'El usuario no existe'});
        }
        res.status(200).json({usuario});
    }catch(error){
        console.log(error);
        res.status(500).json({msg: 'Hubo un error en el servidor'});
    }
}