const mongoose= require("mongoose");

const BlogsSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,
        default:"../public/tan.png"
    },
    createdBy:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'users'
    },
    
    publishedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
    }
    
},{
    timestamps:true
})
const Blogs= mongoose.model("blog",BlogsSchema);
module.exports=Blogs;