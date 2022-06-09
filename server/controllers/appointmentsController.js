const Appointment = require('../model/Appointment')
const ObjectId = require('mongodb').ObjectId

const createAppointment =  async (req, res) => {
    console.log("llegue a appointment")
    const size = req.body.length
    console.log(size)
    try {
    
    for(i=0; i<=size-1;i++){
       
        const appoint = new Appointment({
            id: req.body[i].id,
            startDate: req.body[i].startDate,
            endDate: req.body[i].endDate,
            title: req.body[i].title,
            allDay: req.body[i].allDay,
            notes: req.body[i].notes
        })
        var result = await appoint.save()
    }


    const {pass, ...data} = await result.toJSON()

    res.send(data)
        
    } catch (error) {
        console.log(error)        
    }   
}

const getAllAppointments = async(req, res) =>{  
    try {
        const appo = await Appointment.find({})
            res.json(appo)
        
    } catch (error) {
        console.log(error)
        
    }    
} 

const deleteAppointment = async (req, res) => {
    console.log('LLEGAMSO A ELIMINAR')
    try {
        console.log(req.params.id)
     const filas = await Appointment.deleteOne({"id":req.params.id})  
   
     res.json(filas)
        
    } catch (error) {
        console.log(error)
        
    }
}

  const updateAppointment = async (req, res) => {
    try {
        console.log("entramos a editar")
    const apoint = {
        // id: req.body.id,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        title: req.body.title,
        notes: req.body.notes
        // allDay: req.body.allDay
    }
    //console.log(req.params.id)
     await Appointment.updateOne({id:req.params.id},{$set:apoint}) 
  
            //res.send(results)
            //res.json(filas)
            res.json({
                message: 'campo actualizado'
            })   
        
    } catch (error) {
        console.log(error)
    }
    
}
module.exports = {createAppointment, getAllAppointments, deleteAppointment, updateAppointment}