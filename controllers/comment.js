const Comments = require('../models/comments.js');

const AddComment=async(req,res)=>{
    if (!req.user) {
        return res.status(401).send("Unauthorized: User not authenticated.")
    }
const blog=req.params.id
 const {comment}= req.body;
 const user= req.user._id
 const result= await Comments.create({comment:comment,commentedBy:user,blog:blog});
 if (!result) {
    return res.status(404).send("Not Added")
 }
 console.log(result)
  return res.status(201).send("Comment Added")
}

const ShowComments = async (req, res) => {
    const id= req.params.id
    try {
        const comments = await Comments.find({blog:id})
            .populate('commentedBy','name')
            .sort({ createdAt: -1 }); 

        if (comments.length === 0) {
            return res.status(200).json([]);
        }

        return res.status(200).json(comments);

    } catch (error) {
        console.error("Error showing comments:", error);
        return res.status(500).send("Internal Server Error while fetching comments.");
    }
}
module.exports={AddComment,ShowComments}