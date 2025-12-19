const { SetUser } = require('../services/auth.js');
const User= require('../models/user.js');

const handleUserSignup=async(req,res)=>{
   
    const {name,email,password,avatar}= req.body;
     const existingUser= await User.findOne({email});
 if (existingUser) {
    return res.status(409).json({msg:"User Alredy Exists"})
 }
 const user= await User.create({
   name,email,password,avatar
 })
 
 if (!user) {
    return res.status(404).json({msg:'User Not Found'})
 }
  console.log(user)
 return res.status(201).json({msg:"User Created"})
}

const handleUserLogin=async(req,res)=>{
    const {email,password}= req.body;
    const user= await User.findOne({email});
     
    if (!user) {
       return res.status(404).json({msg:'User Not Found'}) 
    }
    const Match= await user.comparePassword(password);
        if (!Match) {
            return res.status(404).json({msg:"Password is Incorrect"})
        }
    const token= SetUser(user);
    
    res.cookie("token",token, {
    httpOnly: true,  
    secure: true,      // REQUIRED for Render/HTTPS
    sameSite: 'none',  // REQUIRED for cross-domain (React to Render)
    path: '/'
}); 
    return res.status(200).json({msg:'Login Successfully',user:user })
}
const handleLogout=async(req,res)=>{
    res.clearCookie("token");
    return res.status(204).send("Logout Successfully")
}
module.exports={handleUserSignup,handleUserLogin,handleLogout};