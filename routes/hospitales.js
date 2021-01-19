/*
    Hospitales
    ruta: '/api/hospitales'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');

const { getHospitales, getTodosHospitales, crearHospital, actualizarHospital, eliminarHospital} = require('../controllers/hospitales'); 

const router = Router();


router.get('/', validarJWT, getHospitales);
router.get('/todos', validarJWT, getTodosHospitales);
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del hosptal es necesario').not().isEmpty(),
    validarCampos
], crearHospital);
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
], actualizarHospital);

router.delete('/:id', [validarJWT], eliminarHospital);

module.exports = router;