const express = require('express');
const router = express.Router();


const blogController = require('../controllers/blogController')

const autherController = require('../controllers/autherController')

const Middilware = require('../Middilware/Login')

router.post("/authors", autherController.createUser);

router.post("/login",Middilware.LoginAuther)

router.post("/blogs", Middilware.Tokenvarify,blogController.GetDataBlog);

router.get("/blogs",Middilware.Tokenvarify ,blogController.GetDataBlog)

router.put("/blogs/:blogId",Middilware.Tokenvarify,blogController.putBlog);

router.delete("/blogs/:blogId", Middilware.Tokenvarify,blogController.deleteBlog);

router.delete("/blogs", Middilware.Tokenvarify,blogController.DeletedByQuery)



module.exports=router;
