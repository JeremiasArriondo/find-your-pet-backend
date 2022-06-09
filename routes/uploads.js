const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen } = require('../controllers/uploads.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', cargarArchivo);

router.put('/:coleccion/:id', [], actualizarImagen);

module.exports = router;