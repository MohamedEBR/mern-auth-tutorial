const UserSchema = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) 
        return res.status(400).json({msg: 'Password and Email are required'});

    if(password.lenght < 8){
        return res
            .status(400)
            .json({msg : 'Password should be at least 8 characters long'})
    }

    const user = await UserSchema.findOne({email}) //find user in db
    if(user) return response.status(400).json({ msg : 'User already exists'})
    
    const newUser = new UserSchema({email, password})

    //hashing password
    bcrypt.hash(password, 7, async (err, hash) => {
        if(err) return res.status(400).json({msg : 'error while saving password'})

        newUser.password = hash
        const savedUserRes = await newUser.save();

        if(savedUserRes) return res.status(200).json({msg : 'user is sucessfully saved'})
    })
})


module.exports = router;