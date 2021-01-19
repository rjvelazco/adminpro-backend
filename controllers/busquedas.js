const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const getTodo = async(req, res)=>{
    const busqueda = req.params.busqueda;
    const regexp = new RegExp(busqueda, 'i');

    // const usuarios = await Usuario.find({nombre: regexp});
    // const hospitales = await Hospital.find({nombre: regexp});
    // const medicos = await Medico.find({nombre: regexp});

    const [usuarios, hospitales, medicos] = await Promise.all([
        Usuario.find({nombre: regexp}),
        Hospital.find({nombre: regexp}),
        Medico.find({nombre: regexp})
    ])

    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos
    });
}


const getDocumentosColeccion = async(req, res)=>{
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regexp = new RegExp(busqueda, 'i');
    let data; 

    switch (tabla) {
        case 'usuarios':
            data = await Usuario.find({nombre: regexp});
                                
        break;
        
        case 'medicos':
            data = await Medico.find({nombre: regexp})
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre');
                                
        break;

        case 'hospitales':
            data = await Hospital.find({nombre: regexp})
                                .populate('usuario', 'nombre img');
        break;
        
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            });
        }


    res.json({
        ok: true,
        resultados: data
    });
}

const getTotalDocumentosColeccion = async (req, resp)=>{

    try{
        const [totalU, totalM, totalH] = await Promise.all([
            Usuario.countDocuments(),
            Medico.countDocuments(),
            Hospital.countDocuments()
        ]);
    
        return resp.json({
            ok: true,
            totalUsuarios: totalU,
            totalMedicos: totalM,
            totalHospitales: totalH
        });
    }catch(err){
        console.log(err);
        return resp.json({
            ok: false,
            msg: "Hable con el administrador."
        })
    }

}

module.exports ={
    getTodo,
    getDocumentosColeccion,
    getTotalDocumentosColeccion
}