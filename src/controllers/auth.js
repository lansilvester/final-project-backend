const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

exports.register = asyncHandler(async(req, res) => {
    const  {name, email, password } = req.body;

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }
    // Check apakah user sudah ada 📝
    const userExists = await Users.findOne({email})
    if(userExists) {
        res.status(400).json({
            status: "Bad Request",
            message: "User already exists!"
        })
        throw new Error('User already exists')
    }

    // Hash password 🗝️
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await Users.create({
        name,
        email,
        password: hashedPassword
    })
    if(user) {
        res.status(201).json({
            message: "Register Success",
            data: {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: genToken(user._id)
            }
        })
    }else{
        res.status(400).json({
            message: "Invalid user"
        })
        throw new Error('Invalid user data!')
    }

})

exports.login = asyncHandler(async(req, res) => {
   const {email, password} = req.body;
//    Check use email & comparing password 🗝️✅
   const user = await Users.findOne({email})
    if(user &&
        (await bcrypt.compare(password, user.password))
    ){
        res.json({
            message: "✅Login Success",
            data:{
                _id: user.id,
                name: user.name,
                email: user.email,
                token: genToken(user._id)
            }
        })
    } else {
        res.status(400).json({
            status: "Bad Request",
            message: "Invalid Credentials"
        })
        throw new Error('Invalid credentials!')
    }

})

exports.getMe = asyncHandler(async (req, res) => {
    const {_id, name, email} = await Users.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email
    })
})

// Generate JWT
const genToken = (id) => {
    return jwt.sign({id},  process.env.JWT_SECRET, {expiresIn: '30d'})
}