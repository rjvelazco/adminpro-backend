/*

    ruta: /api/todo/

*/

const { Router } = require('express');
const { getTodo, getDocumentosColeccion, getTotalDocumentosColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();


router.get('/:busqueda', [validarJWT], getTodo );
router.get('/coleccion/:tabla/:busqueda', [validarJWT], getDocumentosColeccion );
router.get('/total/documentos', [validarJWT], getTotalDocumentosColeccion );


module.exports = router;