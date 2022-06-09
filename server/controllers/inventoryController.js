const Inventory = require('../model/Inventory')
const ObjectId = require('mongodb').ObjectId

const createInventory =  async (req, res) => {
    console.log("llegue a inventory")
    const lugar = req.body.lugar
    console.log(lugar)
    try {
    
    const invent = new Inventory({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        cantidad: req.body.cantidad,
        precio: req.body.precio
    })

    const result = await invent.save()

    const {pass, ...data} = await result.toJSON()

    res.send(data)
        
    } catch (error) {
        console.log(error)        
    }   
}

const getAllInventory = async(req, res) =>{  
    try {
        const inven = await Inventory.find({})
            res.json(inven)
        
    } catch (error) {
        console.log(error)
        
    }    
} 

const deleteInventory = async (req, res) => {
    try {
     const filas = await Inventory.deleteOne({"_id":ObjectId(req.params.id)})  
                //    await Treatment.deleteMany({"idPaciente":ObjectId(req.params.id)})     
     res.json(filas)
        
    } catch (error) {
        console.log(error)
        
    }
 

  }

  const updateInventory = async (req, res) => {
    try {
        console.log("entramos a editar")
    const invent = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        cantidad: req.body.cantidad,
        precio: req.body.precio
    }
    //console.log(req.params.id)
     await Inventory.updateOne({_id:ObjectId(req.params.id)},{$set:invent}) 
  
            //res.send(results)
            //res.json(filas)
            res.json({
                message: 'campo actualizado'
            })   
        
    } catch (error) {
        console.log(error)
    }
    
}
module.exports = {createInventory, getAllInventory, deleteInventory, updateInventory}