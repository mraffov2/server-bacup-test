
/*
path = api/login
*/


const {Router} = require('express');
const { check } = require('express-validator');
const router = Router()
const {createUser, singinUser, refreshToken} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');

router.post('/create_user', [
    check('name', 'The field name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty().isEmail().withMessage('Email incorrect'),
    check('password', 'The field password is required' ).not().isEmpty(),
    validarCampos
], createUser);

router.post('/singin', [
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required' ).not().isEmpty(),
    validarCampos
], singinUser)

router.get('/referesh-token', validateJWT, refreshToken);


module.exports =  router