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

    //Verificar si el correo existe
    const existeEmail = await User.findOne({ email});
    if (existeEmail) {
        return res.status(400).json({
            msg: 'EL correo ya existe'
        })
    }
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

module.exports = {
    userGet,
    userPost
}