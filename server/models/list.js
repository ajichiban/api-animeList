const mongoose = require('mongoose')

let listSchema = mongoose.Schema({
    name: String,
    animes :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anime'
    }],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('List', listSchema)