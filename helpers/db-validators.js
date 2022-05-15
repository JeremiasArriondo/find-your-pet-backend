const Usuario = require('../models/user.model');

const emailExiste = async( email = '') => {

    //verificar si existe el correo
    const existeEmail = await Usuario.findOne({email});
   console.log(existeEmail)
    if (existeEmail) {
        console.log('existe')
        throw new Error(`El correo ${email} ya está registrado`)
    }
}

module.exports = {
    emailExiste
}