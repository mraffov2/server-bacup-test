const {response} = require('express');
const User = require('../models/user');


const getUsers = async (req, res = response) => {

    const init = Number(req.query.desde) || 0

    const users = await User.find({_id : { $ne: req._id}})
        .sort('-online').skip(init).limit(10)

    try {
        return res.status(200).json({
            ok: true,
            count: users.length,
            users,
        })
    } catch (error) {
        return res.status(404).json({
            ok: false,
            message: '',
        })
    }
};

module.exports = {
    getUsers
};