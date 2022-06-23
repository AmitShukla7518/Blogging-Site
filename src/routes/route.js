const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blogController')
const autherController = require('../controllers/autherController')



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/authors", autherController.createUser);

router.post("/blogs", blogController.createBlog);

router.put("/blogs/:id", blogController.putBlog);

router.put("/blogs/:id", blogController.deleteBlog);

router.get("/loginUser", autherController.loginUser);


router.get("/getUserData/:userId", autherController.getUserData);



module.exports=router;