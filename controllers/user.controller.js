const { response, request } = require('express');
//Importamos el modelo del usuario
const User = require('../models/user.model');

const bcryptjs = require('bcryptjs');
const createResponse = require('../helpers/createResponse');

const userGet = async (req, res = response) => {

    const { limit= 5, from = 0 } = req.query;
    // const query = { state: true }

    const [total, usuarios] = await Promise.all([
        User.countDocuments({state: true}),
        User.find({state: true})
            .skip(Number(from))
            .limit(Number(limit))
    ])

    // res.json({
    //     total,
    //     usuarios
    // });
    return createResponse(res, 200, {total, usuarios})
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

    const { _id, password, google, email, ...resto} = req.body;

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

const userDelete = async (req, res) => {
    const { id } = req.params;
    
    // Borrado fisico
    // const usuario = await User.findByIdAndDelete(id)
    const usuario = await User.findByIdAndUpdate(id, { state: false }, {new: true});
    const usuarioAutenticado = req.usuario;
    res.json({usuario, usuarioAutenticado});
}

module.exports = {
    userGet,
    userPost, 
    userPut,
    userDelete
}