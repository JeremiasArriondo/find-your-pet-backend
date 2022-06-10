const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads.controller');
const { coleccionPermitidas } = require('../helpers/db-validators');
const { validarArchivo } = require('../middlewares/validar-archivos');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', validarArchivo, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivo,
    check('id', 'El id debe de ser del tipo mongoId').isMongoId(),
    check('coleccion').custom( coleccion => coleccionPermitidas( coleccion, ['user', 'publication'])),
    validarCampos
], actualizarImagenCloudinary);

router.get('/:coleccion/:id', [
    check('id', 'El id debe de ser del tipo mongoId').isMongoId(),
    check('coleccion').custom( coleccion => coleccionPermitidas( coleccion, ['user', 'publication'])),
    validarCampos
], mostrarImagen);

module.exports = router;