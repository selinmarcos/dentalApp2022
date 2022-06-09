const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    idPaciente: {
        type: mongoose.Types.ObjectId,
        required : true
    },
    tratamiento: {
        type: String,
       
    },
    descripcion: {
        type: String,
        
    
    },
    acuenta: {
        type: Number,
     
        
    },
    saldo: {
        type: Number,
     
        
    },
    total: {
        type: Number,
  
        
    },

    fecha: {
        type: String
    },

    // estado:{
    //     type: String
    // },

    c18:{
        type: String,
    },

    c17:{
        type: String,
    },
    c16:{
        type: String,
    },
    c15:{
        type: String,
    },
    c14:{
        type: String,
    },
    c13:{
        type: String,
    },
    c12:{
        type: String,
    },
    c11:{
        type: String,
    },
    c21:{
        type: String,
    },
    c22:{
        type: String,
    },
    c23:{
        type: String,
    },
    c24:{
        type: String,
    },
   
    c25:{
        type: String,
    },
    c26:{
        type: String,
    },
    c27:{
        type: String,
    },
    c28:{
        type: String,
    },
    c48:{
        type: String,
    },
    c47:{
        type: String,
    },
    c46:{
        type: String,
    },
    
    c45:{
        type: String,
    },
    c44:{
        type: String,
    },
    c43:{
        type: String,
    },
    c42:{
        type: String,
    },
    c41:{
        type: String,
    },
    c31:{
        type: String,
    },
    c32:{
        type: String,
    },
    c33:{
        type: String,
    },
    c34:{
        type: String,
    },
    c35:{
        type: String,
    },
    c36:{
        type: String,
    },
    c37:{
        type: String,
    },
    c38:{
        type: String,
    },

    //boys
    c55:{
        type: String,
    },
    c54:{
        type: String,
    },
    c53:{
        type: String,
    },
    c52:{
        type: String,
    },
    c51:{
        type: String,
    },
    c61:{
        type: String,
    },
    c62:{
        type: String,
    },
    c63:{
        type: String,
    },
    c64:{
        type: String,
    },
    c65:{
        type: String,
    },

    c85:{
        type: String,
    },
    c84:{
        type: String,
    },
    c83:{
        type: String,
    },
    c82:{
        type: String,
    },
    c81:{
        type: String,
    },
    c71:{
        type: String,
    },
    c72:{
        type: String,
    },
    c73:{
        type: String,
    },
    c74:{
        type: String,
    },
    c75:{
        type: String,
    },



  
})

module.exports = mongoose.model('Treatment', userSchema)