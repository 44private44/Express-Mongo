const { default: mongoose } = require("mongoose");
const Blog = require("../model/Blog");

//Get all blogs
exports.getAllBlogs = async function (req, res, next) {

    let blogs;

    try {
        blogs = await Blog.find();
    } catch (error) {
        return console.log(error);
    }

    if (!blogs) {
        return res.status(404).json({ message: "Blog not found !" });
    }

    return res.status(200).json({ blogs });
};

// Add new Blog

exports.addNewBlog = async function (req, res, next) {

    const { title, description, image, user } = req.body;

    // let availableUser;
    // try {
    //     availableUser = await User.findById(user);
    // } catch (error) {
    //     return console.log("hello");
    // }

    // if (!availableUser) {
    //     return res.status(400).json({ message: "Unable to find the User" });
    // }

    const blog = new Blog({
        title, description, image, user
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        availableUser.blogs.push(blog);
        await availableUser.save({ session });
        await session.commitTransaction();

    } catch (error) {
        console.log(error);
        res.status(500).json({message : error});
    }

    return res.status(200).json({ blog });
};

//Update Blog

exports.updateBlog = async function (req, res, next) {

    const { title, description } = req.body;
    const blogId = req.params.bid;

    let blog;

    try {
        blog = await Blog.findByIdAndUpdate(blogId,
            { title, description });
    } catch (error) {
        return console.log(error);
    }

    if (!blog) {
        return res.status(500).json({ message: "Unabld to update the Blog" });
    }

    return res.status(200).json({ blog });
};

// Get one blog by block id 

exports.getOneBlog = async function (req, res, next) {

    let blog;
    const blogId = req.params.bid;

    try {
        blog = await Blog.findById(blogId);
    } catch (error) {
        return console.log(error);
    }

    if (!blog) {
        return res.status(404).json({ message: "Blog not found by this id" });
    }

    return res.status(200).json({ blog });
};

// Delete Blog by id 

exports.blogDelete = async function (req, res, next) {

    const blogId = req.params.bid;
    let blog;

    try {
        blog = await Blog.findByIdAndRemove(blogId);
    } catch (error) {
        return console.log(error);
    }

    if (!blog) {
        return res.status(404).json({ message: "cannot find id.." });
    }

    return res.status(200).json({ message: "Successfully deleted blog..." });
};