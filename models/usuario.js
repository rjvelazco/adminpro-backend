const mongoose = require('mongoose');
const { Schema } =  mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const rolesValidos = {
    values: ['PACIENTE', 'REPRESENTATNE'],
    message: '{VALUE} no es un rol valido.'
}

const usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        required: [true, 'El email debe ser unico.'],
        unique: true
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
        type: Boolean
    }
});

usuarioSchema.plugin(uniqueValidator);


module.exports = mongoose.model('Usuario', usuarioSchema);