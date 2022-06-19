const { Schema, model } = require('mongoose');
const TYPES_PUBLICATION = require('../utils/typePublication');

const PublicationSchema = Schema({
    description: {
        type: String,
        required: [true, 'Es necesario una descripción']
    },
    contactPhone:{
        type: String
    },
    place:{
        type: String,
        required: false
    },
    image: {
        type: String
    },
    typePublication: {
        type: String,
        enum: Object.values(TYPES_PUBLICATION),
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    }},
    { timestamps: true }
);

PublicationSchema.methods.toJSON = function () {
	const { __v, ...publication } = this.toObject();
    return publication;
};

module.exports = model('Publication', PublicationSchema);