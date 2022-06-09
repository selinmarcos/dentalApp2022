const {DataTypes} = require('sequelize')
const connectDB = require('../config/dbConn.js')

const Iventory = connectDB.define('inventory',{
    id:{
        type: DataTypes.INTEGER, primaryKey: true
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
module.exports = {Iventory};