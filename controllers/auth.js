const {response} = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jsonwebtoken');


const createUser = async (req, res = response) => {

    const {email, password} = req.body;
    console.log(req.body);

    try {
        //Check email
        const emailExist = await User.findOne({email});

        
        if(emailExist){
            console.log(`The email ${email} is already registered in the database`)
            return res.status(404).json({
                ok: false,
                message: 'There was a problem registering the new user',
            })
        }


        const user = new User(req.body);

        //Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //Save user
        await user.save()

        //generate Token
        const token = await generateJWT(user._id);
        
        
        res.status(201).json({
            ok: true,
            message: 'User created',
            user: user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Something has happened, please contact the administrator'

        })
    }  
};


const singinUser = async (req, res = response) => {
    const {email, password} = req.body;
    

    try {

        //Check email
        const user = await User.findOne({email});
        console.log(user);

        if(!user){
            return res.status(404).json({
                ok: false,
                message: 'User or email incorrect',
            })
        }

        //Check password
        const validatePassword =  bcrypt.compareSync(password, user.password)
        if(!validatePassword){
            return res.status(404).json({
                ok: false,
                message: 'User or email incorrect',
            })
        }

        //generate Token
        const token = await generateJWT(user._id);

        res.status(201).json({
            ok: true,
            message: 'Sing in successfully',
            user: user,
            token
        })


        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Something has happened, please contact the administrator'

        })
    }
}

const refreshToken = async (req, res= response) => {

    const _id = req._id
    const user = await User.findById({_id});
    const token = await generateJWT(user._id);

    res.json({
        ok: true,
        message: 'Token refreshed',
        user: user,
        token
    })
}

module.exports = {
    createUser,
    singinUser,
    refreshToken
};