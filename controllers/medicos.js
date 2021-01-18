const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getMedicos = async (req, res)=>{

    const desde = Number(req.query.desde) || 0;
    const limit = Number(req.query.limit) || 5;
    const [medicos, total] = await Promise.all([
        Medico.find()
            .populate('hospital', 'nombre img')
            .populate('usuario', 'nombre img')
            .skip( desde )
            .limit( limit ),

        Medico.countDocuments()
    ]);
    // const medicosDB = await Medico.find()
    //                             .populate('hospital', 'nombre img')
    //                             .populate('usuario', 'nombre img');
    res.json({
        ok: true,
        medicos: medicos,
        total
    });
}

const getMedicoById = async (req, res)=>{
    const id = req.params.id;
    try{
        const medicoDB = await Medico.findById(id)
                                .populate('hospital', 'nombre img')
                                .populate('usuario', 'nombre img');

        // if(!medicoDB){
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'No existe un medico con el id indicado.'
        //     })
        // }
        res.json({
            ok: true,
            medico: medicoDB
        });
    } catch(error){
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
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

    const id = req.params.id;
    const uid = req.uid;
    const idh = req.body.hospital;

    try{
        const medicoDB = await Medico.findById(id);

        if(!medicoDB){
            return res.status(400).json({
                ok: false,
                msg: 'El id del medico no ha sido encontrado.'
            });
        }
        const hospitalDB = await Hospital.findById(idh);

        if(!hospitalDB){
            return res.status(400).json({
                ok: false,
                msg: 'El id del hospital no ha sido encontrado.'
            });
        }

        const cambiosMedicos = {
            ...req.body,
            usuario: uid
        }

        const medico = await Medico.findByIdAndUpdate(id, cambiosMedicos, {new: true});

        res.json({
            ok: true,
            medico
        });
    }catch(err){
        res.status(500).json({
            ok: false,
            msg: 'Error, por favor contacte con un administrador.'
        });
    }
    
}

const eliminarMedico = async (req, res)=>{
    
    const id = req.params.id;

    try{

        const medicoDB = await Medico.findById(id);

        if(!medicoDB){
            return res.status(400).json({
                ok: true,
                msg: 'El id del medico no ha sido encontrado.'
            });
        }

        await Medico.findByIdAndRemove(id);
        
        res.json({
            ok: true,
            msg: 'El medico ha borrado de manera Exitosa.'
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error, por favor contacte con un administrador.'
        });
    }
}

module.exports = {
    getMedicos,
    getMedicoById,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}