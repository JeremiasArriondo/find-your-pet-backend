const { Router } = require('express');
const { check, body } = require('express-validator');
const { userGet, userPost, userPut, userDelete } = require('../controllers/user.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { emailExiste, existUserById } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

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
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existUserById ),
        validarCampos
    ],
    userPut
);

router.delete('/:id',
    [
        validarJWT,
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existUserById ),
        validarCampos
    ],
    userDelete
)


//EL check valida lo que viene del body

module.exports = router;