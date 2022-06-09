const Treatment = require('../model/Treatment')
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId


const createTreatment =  async (req, res) => {
    console.log('ME ESTOY EJECUTANDO DETALLE PACIENTE')
    try {
         console.log(req.body.idP)
        // var idP1 = mongoose.Types.ObjectId(req.body.idP)
        
        const trat = new Treatment({
            idPaciente: req.body.idP,
            tratamiento: req.body.tratamiento,
            descripcion: req.body.descripcion,
            fecha: req.body.fecha,
            total: req.body.total,
            acuenta: req.body.acuenta,
            saldo: req.body.saldo,
           
        })
    
        const result = await trat.save()
    
        const {...data} = await result.toJSON()
    
        res.send(data)
        
    } catch (error) {
        console.log(error)
    }

   
}

const getAllTreatments =  async (req, res) => {
    console.log("LLEGMAOS A TREATMENTS")
    try {
        let idP = mongoose.Types.ObjectId(req.params.id)
        console.log(idP)
        const filas = await Treatment.aggregate(
         
            [ 
                {
                    $match:{
                        idPaciente:idP
                    }
        
                },
                {
                    $lookup:{
                        from: "patients",
                        localField: "idPaciente",
                        foreignField: "_id",
                        as: "resultado"
                    }
        
                },
                // // para mostrar en un objeto
                { $unwind:"$resultado"},
              
        
        
            ]
        ) 
            res.json(filas)
        
    } catch (error) {
        console.log(error)
        
    }

}

const deleteTreatment = async (req, res) => {
    try {
     const filas = await Treatment.deleteOne({"_id":ObjectId(req.params.id)})             
     res.json(filas)
     console.log("tratamiento eliminado")
        
    } catch (error) {
        console.log(error)
        
    }
 

}

const editTreatment = async (req, res) => {
    try {
        console.log("entramos a editar tratamiento")
    const trat = {
        // idPaciente: req.body.idP,
        tratamiento: req.body.tratamiento,
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        total: req.body.total,
        acuenta: req.body.acuenta,
        saldo: req.body.saldo
        
    }
    //console.log(req.params.id)
     await Treatment.updateOne({_id:ObjectId(req.params.id)},{$set:trat}) 
  
            //res.send(results)
            //res.json(filas)
            res.json({
                message: 'campo actualizado'
            })   
        
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
    createTreatment,getAllTreatments, deleteTreatment, editTreatment
}