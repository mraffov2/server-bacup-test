const {Router} = require('express');
const { validateJWT } = require('../middlewares/validar-jwt');
const router = Router();
const { getMessages } = require('../controllers/message')

router.get('/messages/:to', validateJWT, getMessages);

module.exports =  router