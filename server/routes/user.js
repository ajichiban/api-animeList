/* --- Models --- */
const User = require('../models/user'),
    List = require('../models/list')
/* --- Packages --- */
const bcrypt = require('bcrypt-nodejs'),
      {tokenVerify} = require('../middlewares/autentication')


const app = require('express')()

/* --- Create User --- */
app.post('/user', (req, res)=>{

    let body = req.body

    let newUser = new User({
        /* name: body.name, */
        username: body.username,
        email: body.email,
        password: bcrypt.hashSync(body.password)
    })

    newUser.save(async (err, userDb)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                Error: err
            })
        }

        //Create Default List
        let listsDefault = ['complete','watching', 'abandoned'],
            lists =[]

        await listsDefault.forEach((list,i)=>{
            let newList = new List({
                name: list,
                user: userDb._id
            })
            newList.save((err, listDb)=>{
                lists.push(listDb)
                console.log('paso - ',i)
                userDb.lists.push(listDb._id) 
            } )
        })

        userDb.save((err, userDb)=>{
            res.json({
                ok:true,
                user: userDb,
                lists
            })
        })
              
    })

})

/* --- Find User by ID --- */
app.get('/user/:id',tokenVerify, (req, res)=>{

    let id = req.params.id

    User.findById(id)
        .populate('lists', 'name')
        .exec((err, userDb)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    Error: err
                })
            }

            res.json({
                ok:true,
                user:userDb
            })
        })
})

/* --- User date by token --- */
app.post('/user/token', tokenVerify, (req, res)=>{

    return res.status(200).json({
        ok:true,
        user: req.user
    })
})
module.exports = app


