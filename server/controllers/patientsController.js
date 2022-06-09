const Patient = require('../model/Patient');
const Treatment = require('../model/Treatment')

const ObjectId = require('mongodb').ObjectId
const createPatient =  async (req, res) => {
        console.log('ME ESTOY EJECUTANDO')
        try {
            const pacientes = new Patient({
                nombre: req.body.nombre,
                celular: req.body.celular,
                direccion: req.body.direccion,
                ci: req.body.ci,
                edad: req.body.edad,
                fecha: req.body.fecha,
                alergias: req.body.alergias
            })
        
            const result = await pacientes.save()
        
            const {...data} = await result.toJSON()
        
            res.send(data)
            
        } catch (error) {
            console.log(error)
        }       
    }

const getAllPatients = async(req, res) =>{  
        try {
            const pacientes = await Patient.find({})
                res.json(pacientes)
            
        } catch (error) {
            console.log(error)
            
        }    
}  

const getPatient =  async (req, res) => {
    try {
        const pacientes = await Patient.findOne({_id:req.params.id})
            res.json(pacientes)
        
    } catch (error) {
        console.log(error)
        
    }

}

const deletePatient = async (req, res) => {
    try {
     const filas = await Patient.deleteOne({"_id":ObjectId(req.params.id)})  
                   await Treatment.deleteMany({"idPaciente":ObjectId(req.params.id)})     
     res.json(filas)
        
    } catch (error) {
        console.log(error)
        
    }
 

  }

//EDIT
const updatePatient = async (req, res) => {
    try {
        console.log("entramos a editar")
    const pacientes = {
        nombre: req.body.nombre,
        celular: req.body.celular,
        direccion: req.body.direccion,
        ci: req.body.ci,
        edad: req.body.edad,
        fecha: req.body.fecha,
        alergias: req.body.alergias
    }
    //console.log(req.params.id)
     await Patient.updateOne({_id:ObjectId(req.params.id)},{$set:pacientes}) 
  
            //res.send(results)
            //res.json(filas)
            res.json({
                message: 'campo actualizado'
            })   
        
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {createPatient, getAllPatients, getPatient, updatePatient, deletePatient}    