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
// In your middleware file (where CheckAuth is defined)

const CheckAuth = (req, res, next) => {
    const token = req.cookies?.token;
    
    // 1. Check if token is missing
    if (!token) {
        console.error("Authentication Error: No token found.");
        // Stop execution and deny access
        return res.status(401).json({ msg: "Access Denied. Please log in." });
    }
    
    // 2. Attempt to get the user payload
    const user = GetUser(token); 

    // 3. Check if GetUser failed (token is expired/invalid)
    if (!user || !user._id) {
        console.error("Authentication Error: Token present but invalid or expired.");
        // Clear the bad token and deny access
        res.clear('token');
        return res.status(403).send("Invalid Token. Access Denied.");
    }
    
    // 4. Success: Attach the valid payload to req.user and proceed
    console.log("Authentication SUCCESS: User attached with ID:", user._id);
    req.user = user;
    next();
};
module.exports={CheckAuth,handleUserLoggedIn};