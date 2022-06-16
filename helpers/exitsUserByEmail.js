const User = require('../models/user.model');
/**
 * Funcion para verificar si existe un email en la db, si no se envia
 * por parametro el email, toma su valor por defecto, el cual es un string vacio
 * chocando así con la validación.
 */
const existsUserByEmail = async (email = '') => {
	//Verificar si el correo existe
	const existsEmail = await User.findOne({ email, state: true });
	if (existsEmail) {
		throw new Error(`El email: ${email}, ya está registrado`);
	}
};

module.exports = { existsUserByEmail };