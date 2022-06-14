const { Router } = require('express');
const { check, body } = require('express-validator');
const { getUser, newUser, getAllUsers, updateUser, deleteUser } = require('../controllers/user.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { emailExiste, existUserById } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/:id', getUser);

router.get('/all', getAllUsers)

router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe poseer más de 6 dígitos').isLength({min: 6}),
        check('email', 'El correo no es válido').isEmail(),
        body('email').custom( emailExiste ),
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