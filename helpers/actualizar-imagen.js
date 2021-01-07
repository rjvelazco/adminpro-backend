const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const actualizarImagen = async (tipo, id, nombreArchivo) =>{

    switch(tipo){
        case 'medicos':
            const medico = await Medico.findById(id);

            eliminarFotoVieja(`./uploads/medicos/${ medico.img }`);

            medico.img = nombreArchivo;
            await medico.save();
        break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);

            eliminarFotoVieja(`./uploads/hospitales/${ hospital.img }`);

            hospital.img = nombreArchivo;
            await hospital.save();
        break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);

            eliminarFotoVieja(`./uploads/usuarios/${ usuario.img }`);

            usuario.img = nombreArchivo;
            await usuario.save();
        break;
    }

}


const eliminarFotoVieja = (path)=>{
    if(fs.existsSync(path)){
        // borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

const exiteId = async (tipo, id)=>{
    let modelo;
    switch(tipo){
        case 'medicos':
            modelo = await Medico.findById(id);   
        break;

        case 'hospitales':
            modelo = await Hospital.findById(id);
        break;

        case 'usuarios':
            modelo = await Usuario.findById(id);
        break;
    }
    
    return (modelo)?true: false;
}

module.exports = {
    actualizarImagen,
    exiteId
}