const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    
    lugar: {
        type: String,
            
    },
    numero: {
        type: Number,
      
    },
    tipo: {
        type: String,
       
    },
    valor: {
        type: Number,
      
    },
})
module.exports = mongoose.model('Odonto', userSchema)
