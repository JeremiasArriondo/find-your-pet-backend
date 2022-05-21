const { Router } = require('express');
const { check, param, query } = require('express-validator');
const { newPublication } = require('../controllers/publication.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post(
    '/',
    [validarCampos],
    newPublication
);


module.exports = router;