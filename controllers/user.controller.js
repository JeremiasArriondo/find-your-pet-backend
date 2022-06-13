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

    return createResponse(res, 200, {total, usuarios})
}

const userPost = async (req = request, res = response) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({name, email, password});

        //Encriptar la contraseña
        //El salt es el tamaño de la encriptacion, por defecto es 10
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt);
        //Guardar en la base de datos
        await user.save();
        //Regreso el usuario guardado
        createResponse(res, 201, user);
    } catch (error) {
        createResponse(res, 500, null, 'Error al crear usuario');
    }  
};

const userPut = async( req, res = response) => {
    try {
        const { id } = req.params;
        //Desestructuro que lo necesite desde el body
        const { _id, password, google, email, ...resto} = req.body;

        if (password){
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync( password, salt);
        }
        //Actualizo al usuario en la base de datos
        //La bandera true, devuelve los datos actualizados
        const user = await User.findByIdAndUpdate( id, resto, {new: true});

        createResponse(res, 200, user);
    } catch (error) {
        createResponse(res, 500, null, 'Error al actualizar usuario');
    }
}

const userDelete = async (req, res) => {
    try {
        const { id } = req.params;
        // Borrado fisico
        // const usuario = await User.findByIdAndDelete(id)
        const user = await User.findByIdAndUpdate(id, { state: false }, {new: true});
        //const usuarioAutenticado = req.usuario;
        //res.json({usuario, usuarioAutenticado});
        createResponse(res, 200, user)
        
    } catch (error) {
        createResponse(res, 500, null, 'Error al eliminar el usuario');
    }
    
}

module.exports = {
    userGet,
    userPost, 
    userPut,
    userDelete
}