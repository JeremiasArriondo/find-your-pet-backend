const { response, request } = require('express');
//Importamos el modelo del usuario
const User = require('../models/user.model');

const bcryptjs = require('bcryptjs');
const createResponse = require('../helpers/createResponse');
const publicationModel = require('../models/publication.model');

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const publication = await User.findById(id);
        createResponse(res, 200, publication)
    } catch (error) {
        createResponse(res, 500, 'Error al obtener el usuario')
    }
};

const getAllUsers = async (req, res = response) => {
    try {
        const { limit= 5, from = 0 } = req.query;
        const query = { state: true }

        const [total, usuarios] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(from))
                .limit(Number(limit))
        ])
        createResponse(res, 200, {total, usuarios})
    } catch (error) {
        console.log(error)
        createResponse(res, 500, null, "Ha ocurrido un error al obtener los usuarios")
    }
    
};

const getAllPublicationsByUser = async (req, res) => {
    try {
        const { _id } = req.usuario;
        const Publications = await publicationModel.find({user: _id});
        createResponse(res, 200, Publications);
    } catch (error) {
        createResponse(res, 500, null, "Ha ocurrido un error al obtener las publicaciones");
    }
};

const newUser = async (req = request, res = response) => {
    try {
        const { name, lastname, email, password } = req.body;
        const user = new User({name, lastname, email, password});

        //Encriptar la contraseña
        //El salt es el tamaño de la encriptacion, por defecto es 10
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt);
        //Guardar en la base de datos
        await user.save();
        //Regreso el usuario guardado
        createResponse(res, 201, user);
    } catch (error) {
        console.log(error)
        createResponse(res, 500, null, 'Error al crear usuario');
    }  
};

const updateUser = async( req, res = response) => {
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

const deleteUser = async (req, res) => {
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
    getUser,
    getAllUsers,
    getAllPublicationsByUser,
    newUser, 
    updateUser,
    deleteUser
}