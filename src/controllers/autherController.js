const authorModel = require('../models/authorModel')
const jwt = require("jsonwebtoken")

/*-----------------Code for CreateUser Started--------------------------*/

const createUser = async function (req, res) {

    try {
        let data = req.body;
        let saveData = await authorModel.create(data);
        res.status(201).send({ msg: saveData })

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ msg: error.message })
    }
}

/*-----------------Code for CreateUser ended--------------------------*/

/*-----------------Code for loginUser Started--------------------------*/

const loginUser = async function (req, res) {
    let userName = req.body.email;
    let password = req.body.password;

    let user = await authorModel.findOne({ email: userName, password: password });
    if (!user) return res.send({ status: false, msg: "userName or Password is incorrect" })

    let token = jwt.sign(
        {
            userId: user._id.toString(),
            author: "bookAuthor",
            motive: "Blog Creation"
        },"Sandip-Amit-Alok"
    );

    res.setHeader("x-auth-token", token);
    res.send({status:true, token:token})
}

const getUserData = async function(req, res){
    let token = req.headers["x-auth-token"]

    if(!token) return res.send({status:false, msg:"token must be present"});
    console.log(token);

    let decodeToken = jwt.verify(token,"Sandip-Amit-Alok");

    if(!decodeToken) res.send({status:false, msg:"Token is Invalid"})

    let userId = req.params.userId;
    let userDetails = await authorModel.findById(userId);
    if(!userDetails) res.send({status:false, msg:"No such User is Available"})

    res.send({status:true, msg:userDetails})
}
module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.getUserData = getUserData;

