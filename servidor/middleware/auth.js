const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    //1. Se recoge el token de x-auth-token
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({msg: 'No hay token, permiso no válido'});
    }
    try{
        //2. Se verifica el token
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();
    }catch(error){
        console.log(error);
        res.status(500).json({msg:'Token no válido'});
    }
}