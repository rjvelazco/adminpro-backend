/*

Medicos
rutas: '/api/medicos'

*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    getMedicoById,
    crearMedico,
    actualizarMedico,
    eliminarMedico
} = require ('../controllers/medicos');



const router = Router();


router.get('/', validarJWT, getMedicos);

router.get('/:id', validarJWT, getMedicoById);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('hospital', 'El id del hospital es requerido').not().isEmpty(),
    check('hospital', 'El hospital id debe de ser valido').isMongoId(),
    validarCampos,
], crearMedico);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('hospital', 'El hospital es requerido.').isMongoId(),
    validarCampos
], actualizarMedico);

router.delete('/:id', [validarJWT], eliminarMedico);

module.exports = router;