const { Router } = require('express');
const { check } = require('express-validator');
const { getUser, newUser, getAllUsers, updateUser, deleteUser } = require('../controllers/user.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { emailExiste, existUserById } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-jwt');
const { existsUserByEmail } = require('../helpers/exitsUserByEmail');
const router = Router();

router.get('/all', getAllUsers);

router.get(
    '/publications',
    [
        validarJWT,
        validarCampos
    ]
)

router.get('/:id', getUser);

router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('lastname', 'El apellido es obligatorio').not().isEmpty(),
        check('password', 'El password debe poseer más de 6 dígitos').isLength({min: 6}),
        check('email', 'El correo no es válido').isEmail(),
        // body('email').custom( emailExiste ),
        check('email').custom(existsUserByEmail),
        validarCampos
    ],
    newUser
);

router.put('/:id',
    [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existUserById ),
        validarCampos
    ],
    updateUser
);

router.delete('/:id',
    [
        validarJWT,
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existUserById ),
        validarCampos
    ],
    deleteUser
);

module.exports = router;