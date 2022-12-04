const jwt = require('jsonwebtoken');
const AuthVerifyMiddleware = (req,res,next)=>{
    let token = req.headers['token-key'];
    jwt.verify(token,"key123",(error,decode)=>{
        if (error){
            res.status(401).json({status:'Invalid token',data:error});
        }else {
            let username = decode['data']['UserName'];
            req.headers.username = username;
            next();
        }
    })
}
module.exports = {AuthVerifyMiddleware};