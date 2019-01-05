/* --- Models --- */
const List = require('../models/list'),
    Anime = require('../models/anime')

/* --- Packages --- */
const {tokenVerify} = require('../middlewares/autentication')

const app = require('express')()

/* --- Lists of one particular user --- */
app.get('/user/:id/lists',tokenVerify, (req, res)=>{

    let userId = req.params.id

    List.find({user: userId})
        .populate('animes')
        .exec((err, listsDb)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                message:'Not found User Id',
                Err:err
            })
        }

        return res.json({
            ok: true,
            lists: listsDb
        })
    })
})

/* --- Add an Anime to a list --- */
app.put('/user/:id/lists/:list',tokenVerify, (req, res)=>{

    let userId = req.params.id,
        listName = req.params.list,
        body = req.body

    // finding  user list
    List.findOne({user: userId, name: listName}, (err, listDb)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                message:'Not found User Id',
                Err:err
            })
        }

        //searching wheter anime exists
        Anime.findOne({name: body.name}, (err, animeFDb)=>{

            if(err){
                return res.status(400).json({
                    ok:false,
                    Err:err
                })
            }

            if(!animeFDb){
                // Create new Anime
                newAnime = new Anime({
                    name: body.name,
                    genre: body.genre,
                    img: body.img,
                    description: body.description,
                    date: body.date,
                    favorito: 1
                })
                newAnime.save((err, animeSDb)=>{
                    
                    if(err){
                        return res.status(400).json({
                            ok:false,
                            Err:err
                        })
                    }
        
                    if(animeSDb){
                        listDb.animes.push(animeSDb._id)
                        listDb.save((err, listUpdate)=>{
                            if(err){
                                res.status(400).json({
                                    ok:false,
                                    Err:err
                                })
                            }

                            res.json({
                                ok:true,
                                list: listUpdate
                            })
                        })
                        
                    }
                    
                })
            }else{
                animeFDb.favorito ++
                animeFDb.save()
                /* Anime.findByIdAndUpdate(animeFDb._id, ) */
                listDb.animes.push(animeFDb._id)
                listDb.save((err, listUpdate)=>{
                    if(err){
                        res.status(400).json({
                            ok:false,
                            Err:err
                        })
                    }

                    res.json({
                        ok:true,
                        list: listUpdate
                    })
                })
            }
            
        })

    })

    


})

// Remove Anime from one list

app.delete('/user/:id/lists/:list/:animeId',tokenVerify, (req, res)=>{
    let userId =  req.params.id,
        listName = req.params.list,
        animeId = req.params.animeId

    List.findOne({name: listName, user: userId})
        .populate('animes')
        .exec((err, listDb)=>{

            if(err){
                return res.status(400).json({
                    ok:false,
                    Err: err
                })
            }

            if(!listDb){
                return res.status(400).json({
                    ok:false,
                    message: 'not found user id or list name'
                })
            }else{  
                
                listDb.animes.pull(animeId)
                listDb.save((err, listDbS)=>{

                    if(err){
                        return res.status(400).json({
                            ok:false,
                            Err : err
                        })
                    }else{
                        res.json({
                            ok:true,
                            list: listDbS
                        })
                    }
                })
            }
        })
})



module.exports = app