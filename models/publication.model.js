const { Schema, model } = require('mongoose');

const PublicationSchema = Schema({
    description: {
        type: String,
        required: [true, 'Es necesario una descripción']
    },
    images: [
        {
            type: String
        }
    ],
    updateDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Publication', PublicationSchema);