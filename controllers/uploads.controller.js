const { response } = require("express");
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const cargarArchivo = (req, res = response) => {
    //Validaciones
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({msg: 'No hay archivos para subir'});
    return;
    }

    // console.log('req.files >>>', req.files); // eslint-disable-line
    const { archivo } = req.files;
    
    const nameCrop = archivo.name.split('.');
    const typeExtension = nameCrop[ nameCrop.length -1];
    //Validar extensión
    const validExtension = ['png', 'jpg', 'jpeg'];

    if (!validExtension.includes( typeExtension )){
        return res.status(400).json({
            msg: `La extensión ${typeExtension} no es válida, ${validExtension}`
        })
    }
    //Genero un identificador unico a la imagen
    const nombreTemp = uuidv4() + '.' + typeExtension;

    const uploadPath = path.join(__dirname, '../uploads/', nombreTemp);

    archivo.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({err});
        }
        res.json({ msg: 'File uploaded to ' + uploadPath});
    });

};



module.exports = {
    cargarArchivo
}