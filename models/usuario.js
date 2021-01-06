const { Schema, model } =  require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const rolesValidos = {
    values: ['USER_ROLE', ''],
    message: '{VALUE} no es un rol valido.'
}

const UsuarioSchema = new Schema({

    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
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

UsuarioSchema.method('toJSON', function(){
    const { __v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

UsuarioSchema.plugin(uniqueValidator, {message: 'Error, {PATH} debe ser unico.'});


module.exports = model('Usuario', UsuarioSchema);