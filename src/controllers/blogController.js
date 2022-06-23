const authorModel = require('../models/authorModel');
const blogModel = require('../models/blogsModel')

/*-------------------CreateBlog Code Started------------------------------*/

const createBlog = async function (req, res) {


    try {
        let data = req.body;


        if (!data.title) return res.status(400).send({ status: false, msg: " Title is Missing" })
        if (!data.category) return res.status(400).send({ status: false, msg: " Please Enter Category" })
        if (Object.keys(data).length == 0)
            return res.status(400).send({ status: false, msg: "Body Cannot be empty" });

        let authorId = req.body.authorId;
        if (!authorId)
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

/*-------------------CreateBlog Code Ended------------------------------*/


//  PUT /blogs/:blogId
// - Updates a blog by changing the its title, body, adding tags, adding a subcategory. (Assuming tag and subcategory received in body is need to be added)
// - Updates a blog by changing its publish status i.e. adds publishedAt date and set published to true
// - Check if the blogId exists (must have isDeleted false). If it doesn't, return an HTTP status 404 with a response body like [this](#error-response-structure)
// - Return an HTTP status 200 if updated successfully with a body like [this](#successful-response-structure) 
// - Also make sure in the response you return the updated blog document.

/*-------------UpdateBlog Code Started------------------------------------*/

const putBlog = async function (req, res) {

    try {
        let blogId = req.params.id;
        let blog = await blogModel.findById(blogId);
        if (!blog) return res.status(404).send({ msg: "Blog Doesn't Exist" })

        let blogData = req.body;
        //if(!blogData.isDeleted==true) return res.send({Status:true, msg:"Blog is Already Deleted"}) // This is condition for if isDeleted is true


        let updatedBlog = await blogModel.findOneAndUpdate(
            { _id: blogId, isDeleted: false },//it will check blog is available or not

            //This will Update the value in MongoDB
            {
                $set: {
                    title: blogData.title,
                    body: blogData.body,
                    category: blogData.category,
                    isPublished: true,
                    publishedAt: Date.now(),
                    $push: { tags: blogData.tags, subcategory: blogData.subcategory }
                }
            },
            { new: true } //this will update result in post man
        );

        res.status(200).send({ status: true, msg: updatedBlog })

    } catch (err) {
        console.log(err);
        res.status(500).send({ status: false, msg: err.message })
    }
}

/*-------------UpdateBlog Code Ended------------------------------------*/

// ### DELETE /blogs/:blogId
// - Check if the blogId exists( and is not deleted). If it does, mark it deleted and return an HTTP status 200 without any response body.
// - If the blog document doesn't exist then return an HTTP status of 404 with a body like [this](#error-response-structure) 

/*-------------Code For Blog Dletion Started ------------------------------------*/

const deleteBlog = async function (req, res) {

    try{
    //if (!blog) return res.status(400).send({ status: false, msg: "Blog Not Available" })

    let data = req.body;
    let id = req.params.id;
    let blog = await blogModel.findOneAndUpdate({
        
        //_id:id, isDeleted: false 
        $or: [{ isDeleted: false }, { _id:id }]
    
    },
        {
            $set: {
                isDeleted:true,
                deletedAt: Date.now()
            }
        },
        { new: true }
    )
    if(!blog){
        return res.status(404).send({status:false, msg:"Blog is not available"})
    }

    res.status(200).send({status:true, msg:"Document is Deleted"})
}catch(error){
    console.log("This Is Error", err.message);
    res.status(500).send({status:false, msg:err.message})
}


}


module.exports.createBlog = createBlog;
module.exports.putBlog = putBlog;
module.exports.deleteBlog = deleteBlog;

