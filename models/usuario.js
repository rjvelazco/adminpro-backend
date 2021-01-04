const { Schema, model } =  require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const rolesValidos = {
    values: ['', ''],
    message: '{VALUE} no es un rol valido.'
}

const UsuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        required: [true, 'El email es requerido.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio.']
    },
    img: {
        type: String,
        required: false
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    google:{
        type: Boolean,
        default: false
    }
});

usuarioSchema.plugin(uniqueValidator, {message: 'Error, {PATH} debe ser unico.'});


module.exports = model('Usuario', UsuarioSchema);