const Usuario = require('../models/user.model');

const emailExiste = async (email = '') => {
    //verificar si existe el correo
    const existeEmail = await Usuario.findOne({email});
    if (existeEmail) {
        console.log('existe')
        throw new Error(`El correo ${email} ya está registrado`)
    }
};

const existUserById = async ( id ) => {
    //Verificamos que exista un usuario
    const existUser = await Usuario.findById( id );
    if (!existUser){
        throw new Error(`El ID no existe`)
    }
}

module.exports = {
    emailExiste,
    existUserById
}