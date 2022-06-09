const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('dentalApp', 'root', '', {
            host:'localhost',
            dialect:'mysql'
});
sequelize.authenticate()
    .then(()=>{
        console.log("conected")
    })
    .catch((e)=>{
        console.log('error' + e)
    })


module.exports = sequelize