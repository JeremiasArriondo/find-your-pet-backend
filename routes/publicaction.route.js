const { Router } = require('express');
const { check, param } = require('express-validator');
const {
    newPublication,
    getPublication,
    getAllPublications,
    updatePublication,
    deletePublication, 
    getAllTypeFound,
    getAllTypeWanted} = require('../controllers/publication.controller');
const upload = require('../helpers/upload');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
//Validación del id
const validateId = param('id', 'El id no es válido').isMongoId();

/**
 * Ruta para crear una nueva publicación,
 * utiliza dos midlewares, el primero valida que exista un token válido
 * El segundo valida la subido de un archivo
 */
router.post(
    '/',
    [
        validarJWT,
        upload,
        check('description', 'La descripción es necesaria').not().isEmpty(),
        check('typePublication', 'No es un tipo de publicación válida').isIn(["BUSCADO", "ENCONTRADO"]),
        validarCampos
    ],
    newPublication
);

/**
 * Ruta para obtener una imagen
 * Recibe por parametro el id:
 * @param {id} 
 */
router.get(
    '/all/:id',
    [
        validarJWT,
        validateId
    ],
    getPublication
);

/**
 * Ruta para obtener todas las publicaciones, esta ruta es pública
 */
router.get(
    '/all',
    getAllPublications
);

/**
 * Ruta para obtener todas las publicaciones con el tipo ENCONTRADO
 */
router.get(
    '/found',
    getAllTypeFound
);

/**
 * Ruta para obtener todas las publicacion con el tipo BUSCADO
 */
router.get(
    '/wanted',
    getAllTypeWanted
);

/**
 * Ruta para actualizar una publicación
 * @param {id} recibe el id de la publicación
 */
router.put(
    '/:id',
    [
        validarJWT,
        validateId,
        upload,
        validarCampos
    ],
    updatePublication
);

/**
 * Ruta para eliminar una publicación
 * @param {id} recibe el id de la publicación
 */
router.delete(
    '/:id',
    [
        validarJWT,
        validateId,
        validarCampos
    ],
    deletePublication
);

module.exports = router;