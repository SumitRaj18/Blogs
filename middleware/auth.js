const { GetUser } = require("../services/auth");

const handleUserLoggedIn=(req,res,next)=>{
    const token= req.cookies?.token;
    if (!token) {
        return res.status(401).json({msg:"Access Denied"})
    }
    const userPayload=GetUser(token);
    if (!userPayload) {
        res.clear('token');
        return res.status(403).send("Access Denied or Inavlid Token")
    }
    req.user=userPayload;
    next();
}

const CheckAuth = (req, res, next) => {
    const token = req.cookies?.token;
    
    // 1. Check if token is missing
    if (!token) {
        // Stop execution and deny access
        return res.status(401).json({ msg: "Access Denied. Please log in." });
    }
    
    // 2. Attempt to get the user payload
    const user = GetUser(token); 

    if (!user || !user._id) {
        res.clear('token');
        return res.status(403).send("Invalid Token. Access Denied.");
    }
    
    req.user = user;
    next();
};
module.exports={CheckAuth,handleUserLoggedIn};