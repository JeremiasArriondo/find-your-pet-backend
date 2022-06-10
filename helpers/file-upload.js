const path = require('path');
const { v4: uuidv4 } = require('uuid');

const extensions = ['png', 'jpg', 'jpeg'];

const fileUpload = ( files, validExtension = extensions, folder='' ) => {
    return new Promise((resolve, reject) => {
        const { archivo } = files;
    
        const nameCrop = archivo.name.split('.');
        const typeExtension = nameCrop[ nameCrop.length -1];
        //Validar extensión
        if (!validExtension.includes( typeExtension )){
            return reject(`La extensión ${typeExtension} no es válida - ${validExtension}`)
        }
        //Genero un identificador unico a la imagen
        const finalName = uuidv4() + '.' + typeExtension;
    
        const uploadPath = path.join(__dirname, '../uploads/', folder, finalName);
    
        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }
            resolve( finalName );
        });
    })

}

module.exports = {
    fileUpload
}