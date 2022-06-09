const { response } = require("express");
const { fileUpload } = require("../helpers/file-upload");

const cargarArchivo = async (req, res = response) => {
    //Validaciones
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({msg: 'No hay archivos para subir'});
        return;
    }
    
    try {
        const nameFile = await fileUpload( req.files );
        res.json({ nameFile });
    } catch (msg) {
        res.status(400).json({ msg });
    }
    
};

const actualizarImagen = async(req, res = response ) => {
    const {coleccion, id} = req.params;
    res.json({id, coleccion})
}



module.exports = {
    cargarArchivo,
    actualizarImagen
}