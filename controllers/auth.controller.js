const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/user.model');


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try{

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ email });
        if ( !usuario ) {
            return res.status(400).json({
                msg: `Usuario o contraseña incorrectos`
            });
        };
        // SI el usuario está activo
        if ( !usuario.state ) {
            return res.status(400).json({
                msg: 'El usuario está inactivo'
            });
        };
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ){
            return res.status(400).json({
                msg: `Usuario o contraseña incorrectos`
            });
        };
        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
                msg: 'Login ok'
            })
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

   
}


module.exports = {
    login
}