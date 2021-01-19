const Hospital = require('../models/hospital');

const getHospitales = async(req, res)=>{
    
    const desde = Number(req.query.desde) || 0;
    const limit = Number(req.query.limit) || 5;

    const [hospitales, total] = await Promise.all([
        Hospital.find()
            .populate('hospital', 'nombre img')
            .populate('usuario', 'nombre img')
            .skip( desde )
            .limit( limit ),

            Hospital.countDocuments()
    ]);

    res.json({
        ok: true,
        hospitales,
        total
    });
}

const getTodosHospitales = async(req, res)=>{
    
    const hospitalesDB = await Hospital.find()
            .populate('hospital', 'nombre img')
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
    const uid = req.uid;
    const id = req.params.id;;

    try{
        const hospitalDB = await Hospital.findById(id);

        if(!hospitalDB){
            return res.status(400).json({
                ok: false,
                msg: 'El id del hospital no ha sido encontrado.'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new: true});

        res.json({
            ok: true,
            hospital: hospitalActualizado
        })

    } catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error, por favor contacte con un administrador.'
        });
    }

}

const eliminarHospital = async(req, res)=>{
    
    const id = req.params.id;

    try{
        const hospitalDB = await Hospital.findById(id);

        if(!hospitalDB){
            return res.status(400).json({
                ok: false,
                msg: 'El id del hospital no ha sido encontrado.'
            });
        }

        await Hospital.findByIdAndRemove(id);

        res.json({
            ok: true,
            msg: 'El hospital ha borrado de manera Exitosa.',
        });

    }catch(err){
        res.status(500).json({
            ok: false,
            msg: 'Error, por favor contacte con un administrador.'
        });
    }
    
}


module.exports = {
    getHospitales,
    getTodosHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital 
}