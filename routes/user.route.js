const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPost } = require('../controllers/user.controller');

const router = new Router();

router.get('/', userGet);

router.post('/',
    [
        check('email', 'El correo no es válido').isEmail(),
    ],userPost);

//EL check valida lo que viene del body

module.exports = router;