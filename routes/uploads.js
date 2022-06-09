const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen } = require('../controllers/uploads.controller');
const { coleccionPermitidas } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', cargarArchivo);

router.put('/:coleccion/:id', [
    check('id', 'El id debe de ser del tipo mongoId').isMongoId(),
    check('coleccion').custom( coleccion => coleccionPermitidas( coleccion, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagen);

module.exports = router;