const express = require('express')
const {DataTypes} = require('sequelize')
const Sequelize = require('sequelize')
const app = express()

const sequelize = new Sequelize('dentalApp', 'root', '', {
    host:'localhost',
    dialect:'mysql'
});

const inventoryModel = sequelize.define('inventory',{
    id:{
        type: DataTypes.INTEGER, primaryKey:true, 
    },
    nombre: {
        type: DataTypes.STRING,            
    },
    descripcion: {
        type: DataTypes.STRING,      
    },
    estado:{
        type: DataTypes.STRING,
    },
    cantidad: {
        type: DataTypes.NUMBER,
      
    },
    precio: {
        type: DataTypes.NUMBER,
       
    },

})

sequelize.authenticate()
    .then(()=>{
        console.log("CONEXION EXITOS A MYSQL")
    })
    .catch((e)=>{
        console.log(e)
    })
app.listen(3001, ()=>{
    console.log('Server Runing at PORT 3001')
})