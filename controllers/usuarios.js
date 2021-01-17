const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res)=>{
    
    const desde = Number(req.query.desde) || 0;
    const limit = Number(req.query.limit) || 5;

    // const usuario = await Usuario
    //                         .find({}, 'nombre email role google')
    //                         .skip( desde )
    //                         .limit( limit );
    
    // const total = await Usuario.count();

    const [usuarios, total] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip( desde )
            .limit( limit ),

        Usuario.countDocuments()
    ]);


    res.json({
        ok: true,
        usuarios,
        total
    });
}

const crearUsuario = async (req, res)=>{

    const { password, email } = req.body;

    try{
        const existeEmail = await Usuario.findOne({email});

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }
        const usuario = new Usuario(req.body);

        // Encriptar Password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardamos usuario
        await usuario.save();
        
        // Generar el token
        const token = await generarJWT(usuario.id);
        res.json({
            ok: true,
            usuario,
            token
        });

    } catch(err){
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}


const actualizarUsuario = async (req, res)=>{

    const id = req.params.id;
    const { email, google, password, ...body } = req.body;

    const opc = { new: true, runValidators: true, context: 'query' };
    try{
        const usuarioDB = await Usuario.findById(id)

        if( !usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }

        if(email !== usuarioDB.email){
            const existeEmail = await Usuario.findOne({email: email});

            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'El email ya existe'
                })
            }
        }
        
        // Validamos que el usuario no pueda actualizar su email
        // Si ha creado su cuenta con Google
        if(!usuarioDB.google){
            body.email = email;
        } else if(usuarioDB.email !== email){
            return res.status(400).json({
                ok: false,
                msg: 'Usuarios de Google no pueden cambiar su correo'
            })
        }

        // Actualizaciones
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, body, opc);
        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    }catch(err){
        res.status(500).json({
            ok: false,
            msg: err
        })
    }

}

const deleteUsuario = async (req, res)=>{

    const id = req.params.id;

    try{
        const usuarioBorrado = await Usuario.findByIdAndRemove(id);

        if(usuarioBorrado){
            res.json({
                ok: true,
                usuarioBorrado
            })
        } else {
            throw 'Usuario no encontado.';
        }
    }catch(err){
        res.status(400).json({
            ok: false,
            err
        })
    }


}



module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    deleteUsuario
}