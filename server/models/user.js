const mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator')

//Roles
let rolesValid = {
    values: ['ADMIN_ROLE','USER_ROLE','ASSISTENT_ROLE'],
    message: '{VALUE} no es un rol valido'
}

let userSchema = mongoose.Schema({
    name:{
        type: String,
        /* required: [true, 'the name is required'] */
        default: 'username'
    },
    username:{
        type: String,
        required: [true, 'username is required'],
        unique : true
    },
    email: {
        type : String,
        unique: true,
        required:[true, 'email is required']
    },
    password:{
        type: String,
        required: [true, 'password is required']
    },
    role:{
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: rolesValid
    },
    img:{
        type: String,
        required: false
    },
    state:{
        type : Boolean,
        default: true
    },
    lists:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List'
    }]
})

/*--- Validando email ---*/
userSchema.plugin(uniqueValidator, {
    message:'{PATH} already Exists!'
})

module.exports = mongoose.model('User', userSchema)