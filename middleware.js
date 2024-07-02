const jwt = require('jsonwebtoken');
const config = require('./config');

let checkToken = (req, res, next) => {
    if(req.path === '/colaborador/login'){
        return next();
    }

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    console.log('aaaaa ' + token)
    if(token){
        if(token.startsWith('Bearer ')){
            token = token.slice(7, token.length); 
        }
        else{
            return res.json({
                success: false,
                message: 'Token indisponível'
            });
        }
        jwt.verify(token, config.jwtSecret, (err, decoded) =>{
            if(err){
                return res.json({
                    success: false,
                    message: 'O token não é válido'
                })
            }
            else{
                req.decoded = decoded;
                next();
            }
        });
    }
}

module.exports = {
    checkToken : checkToken
}