const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post('/login', 
    [
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    login
);

//Ruta para iniciar sesion con google
//En construccion
router.post('/google',
    [
        check('id_token', 'El id_token es necesario').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
);


module.exports = router;