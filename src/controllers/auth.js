const Users = require('../models/users');
const {validationResult} = require('express-validator');

exports.register = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const err = new Error('Invalid register');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
     
    const Register = new Users({
        name: name,
        email:email,
        password:password
    })
    Register.save()
    .then(result => {
        res.status(201).json({
            message: 'Register Success',
            data:result
        })
    })
    .catch(err => {
        console.log('Err: ', err)
    })
}