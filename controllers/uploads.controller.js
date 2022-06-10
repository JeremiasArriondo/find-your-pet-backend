const { response } = require("express");
const { fileUpload } = require("../helpers/file-upload");
const Publication = require('../models/publication.model');
const User = require('../models/user.model');
const path = require('path');
const fs = require('fs')

const cargarArchivo = async (req, res = response) => {
    try {
        const nameFile = await fileUpload( req.files );
        res.json({ nameFile });
    } catch (msg) {
        res.status(400).json({ msg });
    }
    
};

const actualizarImagen = async(req, res = response ) => {
    const {coleccion, id} = req.params;

    let modelo;
    switch ( coleccion ) {
        case 'user':
            modelo = await User.findById(id);
            if( !modelo ){
                return res.status(400).json({
                    msg: 'No existe un usuario con ese id'
                });
            }
        break;
        case 'publication':
            modelo = await Publication.findById(id);
            if( !modelo ){
                return res.status(400).json({
                    msg: 'No existe una publication con ese id'
                });
            }
        break;
    
        default:
            return res.status(500).json({msg: 'Error en el server, contacte con el administrador'})
    }

    if (modelo.img){
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)){
            //Borra el archivo
            fs.unlinkSync(pathImagen);
        }
    }

    const name = await fileUpload(req.files, undefined, coleccion);
    modelo.img = name;
    
    await modelo.save();

    res.json(modelo);
}


const mostrarImagen = async(req, res= response) => {
    
    const { id, coleccion } = req.params;

    let modelo;
    switch ( coleccion ) {
        case 'user':
            modelo = await User.findById(id);
            if( !modelo ){
                return res.status(400).json({
                    msg: 'No existe un usuario con ese id'
                });
            }
        break;
        case 'publication':
            modelo = await Publication.findById(id);
            if( !modelo ){
                return res.status(400).json({
                    msg: 'No existe una publication con ese id'
                });
            }
        break;
    
        default:
            return res.status(500).json({msg: 'Error en el server, contacte con el administrador'})
    }

    if (modelo.img){
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)){
            return res.sendFile( pathImagen )
        };
    }
    
    const imgNotFound = path.join( __dirname, '../assets/no-image.jpg')
    res.sendFile( imgNotFound );
}



module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}