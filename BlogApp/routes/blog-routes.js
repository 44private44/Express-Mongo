const express  = require('express');
const {getAllBlogs, addNewBlog, updateBlog, getOneBlog, blogDelete} = require('../controllers/blog-controller');
const blogrouter = express.Router();


blogrouter.get("/", getAllBlogs);
blogrouter.post("/addblog", addNewBlog);
blogrouter.put("/updateblog/:bid", updateBlog);
blogrouter.get("/:bid", getOneBlog);
blogrouter.delete("/:bid", blogDelete);

module.exports = blogrouter;