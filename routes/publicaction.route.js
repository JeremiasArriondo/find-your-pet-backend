const { Router } = require('express');
const { check } = require('express-validator');
const { newPublication } = require('../controllers/publication.controller');
const upload = require('../helpers/upload');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/',
    [
        validarJWT,
        upload,
        check('description', 'La descripción es necesaria').not().isEmpty(),
        validarCampos
    ],
    newPublication
);


module.exports = router;