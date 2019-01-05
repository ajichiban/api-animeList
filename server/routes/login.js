/* --- Models --- */
const User = require('../models/user')

/* --- Packages --- */
const bcrypt = require('bcrypt-nodejs'),
      jwt = require('jsonwebtoken')

const app = require('express')()
    
app.post('/login', (req, res)=>{

    let body = req.body

    User.findOne({username: body.username}, (err, userDb)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                Err: err
            })
        }

        // Valid username
        if(!userDb){
            return res.status(402).json({
                ok: false,
                message:'(User) or password is not valid'
            })
        }

        
        // valid password
        if(!bcrypt.compareSync(body.password, userDb.password)){
            return res.status(402).json({
                ok: false,
                message:'User or (password )is not valid'
            })
        }

        // if pass the validations , create the token

        let token = jwt.sign({
            user: userDb
        },process.env.SEED ,{expiresIn : process.env.CADUCIDAD_TOKEN })

        return res.json({
            ok:true,
            user: userDb,
            token

        })

    })

})

module.exports = app