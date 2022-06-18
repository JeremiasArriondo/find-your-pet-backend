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
        const { description, typePublication, ...rest } = req.body;
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
            image: dataImagen.secure_url,
            ...rest
        });
        
        const publicationSaved = await publication.save(); 
       
        createResponse(res, 201, publicationSaved);
    } catch (error) {
        console.log(error)
        createResponse(res, 500, 'Error al crear la publicación')
    }
};

const getPublication = async (req, res) => {
    try {
        const { id } = req.params;
        const publication = await Publication.findById(id);
        createResponse(res, 200, publication)
    } catch (error) {
        createResponse(res, 500, 'Error al obtener la publicación')
    }
};

const getAllPublications = async (req, res) => {
    try {
        const { limit= 10, from = 0 } = req.query;
        // const query = { state: true }
        const [total, publications] = await Promise.all([
            Publication.countDocuments(),
            Publication.find()
                .skip(Number(from))
                .limit(Number(limit))
        ]);
        createResponse(res, 200, {total, publications});
    } catch (error) {
        createResponse(res, 500, null, 'Error al obtener todas las publicaciones');
    }
};

const getAllTypeFound = async (req, res) => {
    try {
        const { limit= 10, from= 0} = req.query;
        const query = {'typePublication':'ENCONTRADO'};
        const [total, publicationsFound] = await Promise.all([
            Publication.countDocuments(query),
            Publication.find(query)
                .skip(Number(from))
                .limit(Number(limit))
        ]);
        createResponse(res, 200, {total, publicationsFound})
    } catch (error) {
        console.log(error)
        createResponse(res, 500, null, 'Error al obtener todas las publicaciones')
    }
}

const getAllTypeWanted = async (req, res) => {
    try {
        const { limit= 10, from= 0} = req.query;
        const query = {'typePublication':'BUSCADO'};
        const [total, publicationsFind] = await Promise.all([
            Publication.countDocuments(query),
            Publication.find(query)
                .skip(Number(from))
                .limit(Number(limit))
        ]);
        createResponse(res, 200, {total, publicationsFind});
    } catch (error) {
        createResponse(res, 500, null, 'Error al obtener todas las publicaciones');
    }
};

/**
 * Endpoint para realizar busquedas por textos,  en la db
 * se creo un indice del tipo text para realizar busquedas más rapidas en ese campo
 * @param text
 */
const searchPublications = async (req, res) => {
    try {

        const {text} = req.body;

        // const result = await Publication.find({$text: {$search: `${text}`}})
        const result = await Publication.aggregate([
            {$match: {$text: {$search: `${text}`}}}
        ])
        createResponse(res, 200, result);
    } catch (error) {
        createResponse(res, 500, null, 'Error al obtener las publicaciones');
    }
};

const updatePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const {...rest} = req.body;
        const publication = await Publication.findById(id);
        if(publication.imagen){
            //Elimino la imagen desde cloudinary
            const nombreArr = modelo.img.split('/');
            const name = nombreArr[ nombreArr.length -1 ];
            const [ public_id ] = name.split('.');
            await cloudinary.uploader.destroy(public_id);
        }
        //Desestructuro el path temporal de la imagen
        const { tempFilePath } = req.files.imagen;
        //Subo imagen a cloudinary
        const dataImagen = await cloudinary.uploader.upload( tempFilePath );
        const updatedPublication = await Publication.findByIdAndUpdate(
            id,
            {
                imagen: dataImagen.secure_url,
                ...rest},
            {new: true}
        );
        createResponse(res, 200, updatedPublication);
    } catch (error) {
        createResponse(res, 500, null, 'Error al actualizar la publicación')
    }
};

const deletePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const publication = await Publication.findByIdAndDelete(id, {new: true});
        //Borrar imagen desde cloudinary
        if(publication.imagen){
            const nombreArr = modelo.img.split('/');
            const name = nombreArr[ nombreArr.length -1 ];
            const [ public_id ] = name.split('.');
            await cloudinary.uploader.destroy(public_id);
        };
        
        createResponse(res, 200, publication)
    } catch (error) {
        createResponse(res, 500, null, 'Error al eliminar la publicación')
    }
}

module.exports = {
    newPublication,
    getPublication,
    getAllPublications,
    getAllTypeFound,
    getAllTypeWanted,
    updatePublication,
    deletePublication,
    searchPublications
}