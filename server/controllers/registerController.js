const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    console.log("LLEGAMOS A REGISTER")
    // console.log(req.body)

    const { username, pwd, name, email, phone, address, ci, role} = req.body;
    if (!username || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: username }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const result = await User.create({
            "username": username,
            "password": hashedPwd,
            "roles":{
                "User": req.body.roles
                // Editor: "",
                // Admin: ""
            },
            // "roles":{
            //     "User": {
            //         type: Number,
            //         default: 2001
            //     // },
            //     "Editor": {
            //         type:Number,
            //         default: 1984
            //     },
            //     "Admin":{
            //         type:Number,
            //         default: 5150
            //     }
            // }
            "name": name,
            // "email": email,
            "phone": phone,
            "address": address,
            "ci":ci,
            // "roles.User": Number(role)
        });
       
        
        const {password, ...data} = await result.toJSON()
    
        res.send(data)
        //comentando esta linea evitamos el error en consola
        res.status(201).json({ 'success': `New user ${user} created!` });

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };