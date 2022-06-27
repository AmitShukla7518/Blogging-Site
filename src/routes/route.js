const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController')
const autherController = require('../controllers/autherController')
const Middilware = require('../Middilware/Login')
// const Middilware2 = require('../Middilware/Mid2')


// router.post("/demo",Middilware.mid2)
// router.get("/test-me", function (req, res) {
//     res.send("My first ever api!")
// })

//
router.post("/authors", autherController.createUser);
router.post("/login",Middilware.LoginAuther)
router.post("/blogs", Middilware.mid2,blogController.createBlog);
router.get("/blogs",Middilware.mid2 ,blogController.GetDataBlog)
router.put("/blogs/:blogId",Middilware.mid2,blogController.putBlog);
router.delete("/blogs/:blogId", Middilware.mid2,blogController.deleteBlog);
router.delete("/blogs", Middilware.mid2,blogController.DeletedByQuery)
// router.get("/getUserData/:userId", autherController.getUserData);
// router.get("/loginUser", autherController);


module.exports=router;
