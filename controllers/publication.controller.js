const { response, request } = require('express');
const Publication = require('../models/publication.model');
const createResponse = require('../helpers/createResponse');
//Importacion de Cloudinary y config
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

/**
* Controlador encargado de crear una nueva publicación
*/

const newPublication = async (req, res = response) => {
    try {
        //Desestructuro del body
        const { description, typePublication } = req.body;
        //Extraigo el id del usuario en el token
        const { _id } = req.usuario;
        //Desestructuro el path temporal de la imagen
        const { tempFilePath } = req.files.imagen;
        //Subo imagen a cloudinary
        const dataImagen = await cloudinary.uploader.upload( tempFilePath );
        //Creación de la publicacion
        const publication = new Publication({
            description,
            typePublication,
            user: _id,
            image: dataImagen.secure_url
        });
        
        // const publicationSaved = await publication.save(); 
       
        createResponse(res, 201, publication);
    } catch (error) {
        console.log(error)
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