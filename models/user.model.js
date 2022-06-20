const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    lastname: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    fullName: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    cellphone: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

UserSchema.methods.toJSON = function () {
	const { __v, password, _id, ...user } = this.toObject();
	user.uid = _id;
    return user;
};

UserSchema.pre('save', function (next) {
	this.fullName = this.name + ' ' + this.lastname;
	next();
});

module.exports = model('User', UserSchema);