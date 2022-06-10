const { response } = require("express");
const { fileUpload } = require("../helpers/file-upload");
const Publication = require('../models/publication.model');
const User = require('../models/user.model');


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

    const name = await fileUpload(req.files, undefined, coleccion);
    modelo.img = name;
    
    await modelo.save();

    res.json(modelo);
}



module.exports = {
    cargarArchivo,
    actualizarImagen
}