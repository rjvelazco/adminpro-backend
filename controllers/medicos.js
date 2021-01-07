const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getMedicos = async (req, res)=>{

    const medicosDB = await Medico.find()
                                .populate('hospital', 'nombre img')
                                .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        medicos: medicosDB
    });


}

const crearMedico = async (req, res)=>{
    const body = req.body;
    body.usuario = req.uid;

    try{

        const medicoDB = new Medico(body);
        await medicoDB.save();

        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch(err){

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }
}

const actualizarMedico = async (req, res)=>{
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    });
}

const eliminarMedico = async (req, res)=>{
    res.json({
        ok: true,
        msg: 'eliminarMedico'
    });
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}