const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {

    
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;
    
    const foundUser = await User.findOne({ refreshToken }).exec();
    // console.log(foundUser.username)
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const username = foundUser.username //prueba
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        // "username": usernam,
                        "roles": roles,
            
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
                // { expiresIn: '10s' }
            );
            res.json({username, roles, accessToken })

        }
    );
}

module.exports = { handleRefreshToken }