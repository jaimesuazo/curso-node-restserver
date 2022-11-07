const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

//login del controller se asigna al router
router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login );

//login del controller se asigna al router
router.post('/google', [
    check('id_token', 'id_token es necesario').not().notEmpty(),
    validarCampos
], googleSignIn );

module.exports = router;