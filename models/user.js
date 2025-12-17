const mongoose= require("mongoose");
const bcrypt = require("bcrypt");

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"../public/tan.png"
    }
},{
    timestamps:true
});

 userSchema.pre("save",async function () {
     const user=this;
     if (!user.isModified('password')) {
         return ;
     }
     try {
         const salt=await bcrypt.genSalt(10);
         user.password= await bcrypt.hash(user.password,salt);
     
     } catch (error) {
         console.log(error)
     }
 })
 userSchema.methods.comparePassword= async function(password){
    return bcrypt.compare(password,this.password)
 }

const User= mongoose.model("users",userSchema);
module.exports=User