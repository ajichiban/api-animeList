const mongoose = require('mongoose')

let animeSchema = mongoose.Schema({
    name :{
        type: String,
        required: true
    },
    genre: {
        type: String,
        required:true
    },
    description:{
        type: String,
        required:false
    },
    img:{
        type: String,
        required:true
    },
    date:{
        type: String,
    },
    favorito:{
        type: Number,
        required:false
    }
})

module.exports = mongoose.model('Anime', animeSchema)