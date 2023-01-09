const jwt = require('jsonwebtoken');


module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve,reject) => {
            const payload = {
                name: "Varland"
            }
            const secret = "bla bla"
            const options = {}
            jwt.sign(payload, secret, options, (err, token) => {
                if(err) reject(err)
                resolve(token)
            })
        })
    }
}