const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nombre: {
        type: String,
       
    },
    celular: {
        type: Number,
        
    },
    direccion: {
        type: String,
               
    },
    ci: {
        type: String,
        
        
    },
    fecha: {
        type: String
    },

    edad:{
        type: Number
    },
    alergias:{
        type: String
    }
 
});

module.exports = mongoose.model('Patient', userSchema);