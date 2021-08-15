const jwt = require('jsonwebtoken');

const generateJWT = (id) => {
    console.log(id);
    return new Promise((resolve, reject) => {
        const payload = {
            id
        };
    
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: '24h'
        }, (err, token ) => {
            if(err) {
                //Can not get token
                reject('Can not get token')
            }else{
                resolve(token)
            }
        })
    })
};

const checkJWT = (token = '') => {
    try {
        const dataJWT = jwt.verify(token, process.env.SECRET)
        id = dataJWT.id

        return [true, id]
    } catch (error) {

        return [false, null]
    }
}

module.exports = {
    generateJWT,
    checkJWT
}
