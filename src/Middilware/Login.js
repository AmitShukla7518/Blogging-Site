const authorModel = require('../models/authorModel');
const jwt = require('jsonwebtoken')
const LoginAuther =  async function (req, res, next) {
    let UserName = req.body.email
    let Password = req.body.password
    let user = await authorModel.find({
        $and: [{ email: UserName }, { password: Password }]
    })
    if (!user) return res.status(404).send({ Error: "Invalid Username or Password" })
    let token = jwt.sign(
        {
            userID: user._id,
            auther: "bookAuthor",
            motive: "Blog-creation"
        }, "Sandip-Amit-Alok"
    );
    // res.setHeaders("x-auth-token", token)
    res.setHeader("x-auth-token", token)
    res.status(200).send({ status: true, token: token })
    console.log("Token Generated Successsfully");
    next()
}
const Tokenvarify = async function (req, res,next) {
    try {
        let Token = req.headers["x-auth-token"]
        let CurrentDateandtime = Date()
        let DecodeToken = await jwt.verify(Token, "Sandip-Amit-Alok")
         if (!DecodeToken) {
       return res.status(400).send({ status: false, msg: "Token is Invalid" })
        }
        else {
            console.log(' "Token  Varifyed Successfully " '+(CurrentDateandtime) );
        }
       next()
    }
    catch (err) {
        res.status(400).send({status:false,Error: err.message})
        console.log(err);
    }
}
module.exports={LoginAuther,Tokenvarify}
// module.exports.LoginAuther = LoginAuther
// module.exports.mid2 = Tokenvarify















