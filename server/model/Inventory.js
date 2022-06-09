const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    
    nombre: {
        type: String,
        required: true
            
    },
    descripcion: {
        type: String,
      
    },
    estado:{
        type: String,
    },
    cantidad: {
        type: Number,
      
    },
    precio: {
        type: Number,
       
    },
 
})
module.exports = mongoose.model('Inventory', userSchema)