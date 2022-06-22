const authorModel = require('../models/authorModel');
const blogModel = require('../models/blogsModel')




const createBlog = async function (req, res) {

    try {
        let data = req.body;
        if (!data.title) return res.status(400).send({ status: false, msg: " Title is Missing" })
        if (!data.category) return res.status(400).send({ status: false, msg: " Please Enter Category" })
        if (Object.key(data).length == 0)
            return res.status(400).send({ status: false, msg: "Enter Author Id" });

        let checkAuthorId = await authorModel.findById(authorId);

        if (!checkAuthorId)
            return res.status(400).send({ status: false, msg: "Author not Found" })

        if (data.isPublished == true) {
            let date = Date.now();
            data.publishedAt = date;
        }

        let saveData = await blogModel.create(data);
        res.status(201).send({ msg: saveData })
    }
    catch (err) {
        console.log("this is error :", err.message)
        res.send({ msg: err.message })
    }
}



module.exports.createBlog = createBlog;