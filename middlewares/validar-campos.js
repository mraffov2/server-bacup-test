const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors)
    if(!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            erorrs: errors.mapped()
        })
    }

    next()
};


module.exports = {
    validarCampos
}