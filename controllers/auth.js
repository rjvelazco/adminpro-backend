const Usuario = require("../models/usuario");
const bcrypt = require('bcrypt');
const { generarJWT } = require('../helpers/jwt');

const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async(req, res)=>{

    const googleToken = req.body.token;
    
    try{

        const {name, email, picture} = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({email: email});

        let usuario;

        if(!usuarioDB){

            // Si no existe el usuario
            // Encriptar Password
            usuario = new Usuario({
                nombre: name,
                email,
                img: picture,
                password: '@@@',
                google: true
            });
            
        } else {

            // Existe usuario;
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en DB
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            msg: 'Google SignIn',
            token
        });

    }catch(err){
        res.status(401).json({
            ok: false,
            msg: 'El token no es correcto.'
        });
    }
}

const renewToken = async (req, res)=>{

    const uid = req.uid;

    try{
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(401).json({
                ok: false,
                msg: 'Usuario no registrado.'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT(uid);

        res.json({
            ok: true,
            token
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Erro al renovar un token. Por favor, contacte con un administrador.'
        });
    }

}

module.exports = {
    login,
    googleSignIn,
    renewToken
}