const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            // default: 5150
        },
        // Editor: {
        //         type:Number,
        //         default: 1984
        // },
        // Admin:{
        //     type:Number,
        //     default: 5150
        // }
       
        // const ROLES_LIST = {
        //     "Admin": 5150,
        //     "Editor": 1984,
        //     "User": 2001
        // }
        // Editor: Number,
        // Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    name:{
        type: String,
        // required: true
    },
    email:{
       type: String,
    //    required: true 
    },
    phone:{
        type: Number,
        // required: true
    },
    ci:{
        type: String,
        // required: true
    },
    address:{
        type: String,
    },

    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);