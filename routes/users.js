
const {Router} = require('express');
const { getUsers } = require('../controllers/users');
const { validateJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.get('/users', validateJWT, getUsers);

module.exports =  router