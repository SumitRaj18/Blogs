const mongoose= require('mongoose')
const CommentSchema= new mongoose.Schema({


comment:{
type:String,
required:true

},
commentedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
},
blog:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'blogs'
}
    
    

},
{
    timestamps:true
})
const Comments= mongoose.model("comment",CommentSchema);
module.exports=Comments;