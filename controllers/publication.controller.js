const { response, request } = require('express');
const User = require('../models/user.model');
const Publication = require('../models/publication.model');
const createResponse = require('../helpers/createResponse');
const mongoose = require('mongoose');
const { fileUpload } = require('../helpers/file-upload');

/**
* Controlador encargado de crear una nueva publicación
*/

const newPublication = async (req = request, res = response) => {
    try {
        //Desestructuro del body
        const { description, typePublication } = req.body;
        //Extraigo el id del usuario en el token
        const { _id } = req.usuario;
        //Subo imagen a cloudinary
        // const image = await fileUpload( req.files );
        const { tempFilePath } = req.files.archivo;
        //Creación de la publicacion
        const publication = new Publication({
            description,
            typePublication,
            user: _id,
            image
        });
        
        // const publicationSaved = await publication.save(); 
       
        // createResponse(res, 201, publicationSaved);
    } catch (error) {
        createResponse(res, 500, 'Error al crear la publicación')
    }
}

const getPublication = async (req, res) => {
    const { id } = req.params;
};

const getAllPublications = async (req, res) => {
    const { limit= 10, from = 0 } = req.query;
    // const query = { state: true }

    const [total, publications] = await Promise.all([
        Publication.countDocuments({state: true}),
        Publication.find({state: true})
            .skip(Number(from))
            .limit(Number(limit))
    ])
    return createResponse(res, 200, {total, publications})
}

const deletePublication = async (req, res) => {
    //Crear response
    try {
        const { id } = req.params;
        const publication = await Publication.findByIdAndUpdate(id, { state: false }, {new: true});
        createResponse(res, 200, publication)
    } catch (error) {
        createResponse(res, 500, null, 'Error al eliminar la publicación')
    }
}

module.exports = {
    newPublication,
    getPublication,
    getAllPublications,
    // updatePublication,
    deletePublication
}