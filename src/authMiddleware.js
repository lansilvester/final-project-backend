const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Users = require('./models/users');

const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // Get Token from header
            token = req.headers.authorization.split(' ')[1]

            // Verifikasi token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user dari token
            req.user = await Users.findById(decoded.id).select('-password')
            next()
        }catch (error){
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if(!token) {
        res.status(401)
        throw new Error('Not authorized, No token!')
    }
})

module.exports = {protect}