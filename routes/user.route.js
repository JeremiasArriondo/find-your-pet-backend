const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPost } = require('../controllers/user.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeEmail } = require('../helpers/db-validators');
const router = new Router();

router.get('/', userGet);

router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe poseer más de 6 dígitos').isLength({min: 6}),
        check('email', 'El correo no es válido').isEmail(),
        check('email').custom( existeEmail ),
        validarCampos
    ],
    userPost);

//EL check valida lo que viene del body

module.exports = router;