const { response } = require("express");
const path = require('path');

const cargarArchivo = (req, res = response) => {
    //Validaciones
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({msg: 'No hay archivos para subir'});
    return;
    }

    // console.log('req.files >>>', req.files); // eslint-disable-line
    const { archivo } = req.files;

    const uploadPath = path.join(__dirname, '/uploads/', archivo.name);

    sampleFile.mv(uploadPath, function(err) {
    if (err) {
        return res.status(500).send(err);
    }

    res.send('File uploaded to ' + uploadPath);
    })
};



module.exports = {
    cargarArchivo
}