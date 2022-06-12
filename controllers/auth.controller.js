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
            return res.status(400).json({
                msg: `Usuario o contraseña incorrectos`
            });
        };
        // SI el usuario está activo
        if ( !user.state ) {
            return res.status(400).json({
                msg: 'El usuario está inactivo'
            });
        };
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ){
            return res.status(400).json({
                msg: `Usuario o contraseña incorrectos`
            });
        };
        // Generar el JWT
        const token = await generarJWT( user.id );

        const data = {
            user: {
                id: user.id,
                name: user.name,
                lastname: user.lastName ?? '',
                email: user.email
            },
            token
        }

        createResponse(res, 200, data);
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
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