/*
    Ruta: /api/usuarios
*/
// Router
const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  deleteUsuario,
  getTareas,
  agregarTarea,
  eliminarTarea,
} = require("../controllers/usuarios");
const {
  validarJWT,
  validarADMIN_ROLE,
  validarADMIN_ROLE_o_MismoUsuario,
} = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, getUsuarios);

router.get("/tareas", validarJWT, getTareas);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/tarea",
  [
    validarJWT,
    check("tarea", "La tarea es requerida").not().isEmpty(),
    validarCampos,
  ],
  agregarTarea
);

router.put(
  "/:id",
  [
    validarJWT,
    validarADMIN_ROLE_o_MismoUsuario,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    validarCampos,
  ],
  actualizarUsuario
);

router.delete("/:id", [validarJWT, validarADMIN_ROLE], deleteUsuario);

router.delete("/tareas/:inidice", [validarJWT], eliminarTarea);

module.exports = router;
