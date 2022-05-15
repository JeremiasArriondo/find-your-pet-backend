const { Router } = require('express');
const { check, body } = require('express-validator');
const { userGet, userPost, userPut } = require('../controllers/user.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { emailExiste } = require('../helpers/db-validators');
const router = new Router();

router.get('/', userGet);

router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe poseer más de 6 dígitos').isLength({min: 6}),
        check('email', 'El correo no es válido').isEmail(),
        body('email').custom( emailExiste ),
        validarCampos
    ],
    userPost
);

router.put('/:id',
    [
        validarCampos
    ],
    userPut
)


//EL check valida lo que viene del body

module.exports = router;