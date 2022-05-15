const { response, request } = require('express');
//Importamos el modelo del usuario
const User = require('../models/user.model');

const bcryptjs = require('bcryptjs');

const userGet = (req, res = response) => {
    res.json({
        msg: 'get API - controller'
    });
}

const userPost = async (req = request, res = response) => {

    const { name, email, password } = req.body;
    const user = new User({name, email, password});

    //Encriptar la contraseña
    //El salt es el tamaño de la encriptacion, por defecto es 10
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt);
    //Guardar en la base de datos
    await user.save();
    res.json({
        msg: 'Post API - controller',
        user
    });
}

const userPut = async( req, res = response) => {

    const { id } = req.params;

    const { password, google, email, ...resto} = req.body;

    if (password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }

    const usuario = await User.findByIdAndUpdate( id, resto, {new: true});

    res.json({
        msg: 'Put API - Controller',
        usuario
    })
}

module.exports = {
    userGet,
    userPost, 
    userPut
}