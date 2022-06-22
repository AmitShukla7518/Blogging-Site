const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blogController')
const autherController = require('../controllers/autherController')



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/authors", autherController.createUser);

router.post("/blogs", blogController.createBlog);



module.exports=router;