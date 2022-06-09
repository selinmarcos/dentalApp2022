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
    }

  


  
})

module.exports = mongoose.model('Treatment', userSchema)