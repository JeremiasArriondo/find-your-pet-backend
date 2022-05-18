const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/user.model');

const validarJWT = async( req = request, res = response, next ) => {
    
    const token = req.header('x-token');
    
    if ( !token ){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        //Virify para controlar el token
        const { uid } =jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        //Busco al usuario que corresponde con el uid
        const usuario = await Usuario.findById( uid );

        if ( !usuario ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en db'
            })
        }

        //Verificar si el user esta activo
        if ( !usuario.state ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario inactivo'
            })
        }

        req.usuario = usuario;
        
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

    
}

module.exports = {
    validarJWT
}