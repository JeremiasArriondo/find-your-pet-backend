const bcryptjs = require('bcryptjs');
const { response } = require('express');
const createResponse = require('../helpers/createResponse');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/user.model');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try{

        // Verificar si el email existe
        const user = await Usuario.findOne({ email });
        if ( !user ) {
            return createResponse(res, 400, null, 'Usuario o contraseña incorrectos');
        };
        // SI el usuario está activo
        if ( !user.state ) {
            return createResponse(res, 400, null, 'El usuario está inactivo, consulte con el administrador');
        };
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ){
            return createResponse(res, 400, null, 'Usuario o contraseña incorrectos');
        };
        // Generar el JWT
        const token = await generarJWT( user.id );

        const data = {
            user: {
                id: user.id,
                name: user.name,
                lastname: user.lastname,
                email: user.email
            },
            token
        }

        createResponse(res, 200, data);
    } catch (error) {
        console.log(error)
        createResponse(res, 500, null, 'Hable con el administrador')
    }   
}

const googleSignIn = async( req, res = response) => {
    const { id_token } = req.body;
    res.json({
        msg: 'ok',
        id_token
    })
}


module.exports = {
    login,
    googleSignIn
}