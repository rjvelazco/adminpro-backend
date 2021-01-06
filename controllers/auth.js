const Usuario = require("../models/usuario");
const bcrypt = require('bcrypt');
const {generarJWT} = require('../helpers/jwt');
const login = async(req, res)=>{

    const { email, password } = req.body;

    try{

        const usuarioDB = await Usuario.findOne({email});

        // Verificar email
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email o passwords no valido' 
            });
        }

        // Verificar password
        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validarPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Email o passwords no valido',
            });
        }

        // Generar el TOKEN - JWT

        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        });
        
    }catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}

module.exports = {
    login
}