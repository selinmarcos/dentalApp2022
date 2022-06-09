const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: Number,
        
    },
    startDate: {
        type: Date,
               
    },
    endDate: {
        type: Date,
        
        
    },
    title: {
        type: String    
    },

    allday:{
        type: Boolean
    },
    notes:{
        type: String
    }


});

module.exports = mongoose.model('Appointment', userSchema);