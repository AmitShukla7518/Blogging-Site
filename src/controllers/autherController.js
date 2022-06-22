const authorModel = require('../models/authorModel')

const createUser = async function(req, res){
    let data = req.body;
    let saveData = await authorModel.create(data);
    res.status(201).send({msg:saveData})
}

module.exports.createUser = createUser;