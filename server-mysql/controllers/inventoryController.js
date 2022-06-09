const Inventory = require('../model/Inventory.js')
// const ObjectId = require('mongodb').ObjectId

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

    const result = await invent.create()

    const {pass, ...data} = await result.toJSON()

    res.send(data)
        
    } catch (error) {
        console.log(error)        
    }   
}

const getAllInventory = async(req, res) =>{  
    try {
        const inven = await Inventory.findAll   ({})
            res.json(inven)
        
    } catch (error) {
        console.log(error)
        
    }    
} 

// const deleteInventory = async (req, res) => {
//     try {
//      const filas = await Inventory.deleteOne({"_id":ObjectId(req.params.id)})  
//      res.json(filas)
        
//     } catch (error) {
//         console.log(error)       
//     }
//   }

//   const updateInventory = async (req, res) => {
//     try {
//         console.log("entramos a editar")
//     const invent = {
//         nombre: req.body.nombre,
//         descripcion: req.body.descripcion,
//         estado: req.body.estado,
//         cantidad: req.body.cantidad,
//         precio: req.body.precio
//     }

//      await Inventory.update({_id:ObjectId(req.params.id)},{$set:invent}) 
  
//             res.json({
//                 message: 'campo actualizado'
//             })   
        
//     } catch (error) {
//         console.log(error)
//     }
    
// }
module.exports = {createInventory, getAllInventory}