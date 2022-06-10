const { Schema, model } = require('mongoose');

const PublicationSchema = Schema({
    description: {
        type: String,
        required: [true, 'Es necesario una descripción']
    },
    images: {
            type: String
    },
    usuario: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    },
    { timestamps: true }
);

module.exports = model('Publication', PublicationSchema);