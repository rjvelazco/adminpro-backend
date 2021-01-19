const path = require('path');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
const { actualizarImagen, exiteId } = require('../helpers/actualizar-imagen');

const fileUpload = async (req, res) =>{

    const tipo = req.params.tipo;
    const id   = req.params.id;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario, u hospital. Seleccione un tipo valido.'
        })
    };

    // Validar la existencia de un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo.'
        });
    };

    // Procesar la imagen...
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.'); 
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if( !extensionesValidas.includes(extensionArchivo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida.'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Path para guardar la imagen
    const pathImagen = path.resolve(__dirname, `../uploads/${tipo}/${nombreArchivo}`);

    if(await exiteId(tipo, id)){
        // Mover la imagen
        file.mv(`${pathImagen}`, async (err) =>{
            if (err){
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: 'Error al mover la imagen.',
                    path: pathImagen,
                    err
                })
            };
    
            // Actualizar base de datos
            await actualizarImagen(tipo, id, nombreArchivo)
            
            return res.json({
                ok: true,
                msg: 'Archivo subido',
                nombreArchivo,
                imagen: pathImagen
                // /app/uploads/medicos/4393f96b-711d-400c-8002-559a9ac75e5e.jpg
                // /app/uploads/usuarios/8c42b27a-cb8a-4f82-954a-acf0912f6df2.jpeg"
            }); 
        });
    } else {
        return res.status(400).json({
            ok: false,
            msg: `No se ha encontrado el id ingresado.`
        });
    }
}

const retornarImagen = (req, res) =>{

    const tipo = req.params.tipo;
    const foto = req.params.foto;


    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    // Imagen por Defecto
    if(fs.existsSync(pathImg)){
        res.sendFile( pathImg );
    } else{
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile( pathImg );
    }

}

module.exports = {
    fileUpload,
    retornarImagen
}