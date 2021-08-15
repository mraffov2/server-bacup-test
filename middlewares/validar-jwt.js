const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = async (req, res = response, next) => {
    const token = req.header('x-token');
    if(!token) {
        return res.status(401).json({
            ok: false,
            message: 'Not authorized'

        })
    }

    try {
        const dataJWT = jwt.verify(token, process.env.SECRET)
        req._id = dataJWT.id
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Invalid token'

        })
    }
}

module.exports = {
    validateJWT
}