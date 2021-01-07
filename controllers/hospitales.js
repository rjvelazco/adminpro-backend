const Hospital = require('../models/hospital');

const getHospitales = async(req, res)=>{

    const hospitalesDB = await Hospital.find()
                                    .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales: hospitalesDB
    });
}

const crearHospital = async(req, res)=>{
    const id = req.uid;

    try{
        const hospitalDB = new Hospital({...req.body, usuario: id});

        await hospitalDB.save();
        
        res.json({
            ok: true,
            hospital: hospitalDB
        });

    }catch(err){

        console.log(err);

        res.status(500).json({ 
            ok: false,
            msg: 'Hable con el administrador'
        });


    }
}

const actualizarHospital = async(req, res)=>{
    
    res.json({
        ok: true,
        msg: 'actualizarHospital'
    });

}

const eliminarHospital = async(req, res)=>{
    res.json({
        ok: true,
        msg: 'borrarHospital'
    });
}


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital 
}