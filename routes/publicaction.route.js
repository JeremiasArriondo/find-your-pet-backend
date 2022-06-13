const { Router } = require('express');
const { check, param, query } = require('express-validator');
const { newPublication } = require('../controllers/publication.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/',
    [
        validarJWT,
        check('description', 'La descripción es necesaria').not().isEmpty(),
        validarCampos
    ],
    newPublication
);


module.exports = router;