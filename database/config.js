const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {

    try {
        await mongoose.connect( process.env.MONGODB_CNN );
        console.log('BD: OK');
    } catch (error) {
        console.log('DB: NO OK');
        throw new Error('Error al iniciar la conexión a la base de datos')
    }
}

module.exports = {
    dbConnection
}