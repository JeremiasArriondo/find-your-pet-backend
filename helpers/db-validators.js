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

const coleccionPermitidas = (coleccion= '', colecciones = []) => {
    const incluida = colecciones.includes( coleccion )
    if (!incluida){
        throw new Error(`La colección ${coleccion} no es permitida`)
    }
    return true;
}

module.exports = {
    emailExiste,
    existUserById,
    coleccionPermitidas
}