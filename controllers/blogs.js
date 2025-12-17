const Blogs = require("../models/blogs.js");
const AddBlogs=async(req,res)=>{
    const{title,body} = req.body;
    const DEFAULT_IMAGE_PATH = '/uploads/tan.png';
     let coverImagePublicPath;
    if (req.file) {
         coverImagePublicPath = `/uploads/${req.file.filename}`
    } else {
        coverImagePublicPath=DEFAULT_IMAGE_PATH;
    }


    if (!req.user || !req.user._id) {
        return res.status(401).send("Unauthorized: User not authenticated.");
    }
    try {
        const AddBlog = await Blogs.create({
            title, body, coverImage: coverImagePublicPath,
            createdBy: req.user._id,
            publishedBy: req.user._id, 
        })
        return res.status(201).send("Blog Added successfully");
    } catch (error) {
        console.error("Error adding blog:", error);
        // Handle Mongoose validation errors or other DB errors
        return res.status(500).json({ message: "Failed to save blog to the database." });
    }

}
const AllUserBlogs=async(req,res)=>{
    try {
        const result= await Blogs.find().populate('publishedBy','name');
return res.json(result);
    } catch (error) {
    console.log(error)
    }
}
const DeleteBlog=async (req,res) => {
     try {
        const id= req.params.id;
        const result= await Blogs.findByIdAndDelete({_id:id});
return res.json({msg:'Blog Deleted'});
    } catch (error) {
    console.log(error)
    }
}

const AllBlogs=async(req,res)=>{
    if (!req.user || !req.user._id) {
        return res.status(401).send("Unauthorized: User not authenticated.");
    }
    const AllBlog= await Blogs.find({createdBy:req.user._id});
    if (!AllBlog) {
        return res.status(404).send("Blogs Not Found")
    }
    return res.json(AllBlog)
}
const SpecificBlog=async(req,res)=>{
    const id= req.params.id;
    const Blog= await Blogs.findById({_id:id});
    if (Blog) {
        return res.status(200).json(Blog)
    }
    else{
        return res.status(404).send("Blog Not Found")
    }
}

module.exports={AddBlogs,AllBlogs,AllUserBlogs,SpecificBlog,DeleteBlog};