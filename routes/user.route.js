const { Router } = require('express');
const { userGet, userPost } = require('../controllers/user.controller');

const router = new Router();

router.get('/', userGet);

router.post('/', userPost);



module.exports = router;