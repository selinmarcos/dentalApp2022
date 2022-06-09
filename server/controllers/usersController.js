const User = require('../model/User');
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const deleteUser = async (req, res) => {
    //forma original

    // console.log(req.body.id)
    // if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
    // const user = await User.findOne({ _id: req.body.id }).exec();
    // if (!user) {
    //     return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
    // }
    // const result = await user.deleteOne({ _id: req.body.id });
    // res.json(result);

    //otra forma

    try {
        const filas = await User.deleteOne({"_id":ObjectId(req.params.id)})  
                    //   await Treatment.deleteMany({"idPaciente":ObjectId(req.params.id)})     
        res.json(filas)
           
       } catch (error) {
           console.log(error)
           
       }
}

const getUser = async (req, res) => {
  
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(user);
}

const updateUser = async (req, res) => {
    console.log(req.body)
    const { username, pwd, name, phone, address, ci} = req.body;
    try {
        console.log("entramos a editar")
        const hashedPwd = await bcrypt.hash(pwd, 10);
    const usuario = {
        "username": username,
        "password": hashedPwd,
       "roles":{
            "User":  req.body.roles.User ? req.body.roles.User : req.body.roles
        },
        // "roles":parseInt(req.body.roles),
        "name": name,
        "phone": phone,
        "address": address,
        "ci":ci,
    }
    //console.log(req.params.id)
    await User.updateOne({_id:ObjectId(req.params.id)},{$set:usuario}) 
  
            // res.send(results)
            //res.json(filas)
            res.json({
                message: 'campo actualizado'
            })   
        
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
    getAllUsers,
    deleteUser,
    getUser,
    updateUser
}