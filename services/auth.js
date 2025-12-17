const jwt = require("jsonwebtoken");
require('dotenv').config(); // Load environment variables

const SECRET_KEY= process.env.API_KEY;



const SetUser=(user)=>{
return jwt.sign({
    _id:user._id,
    email:user.email,

},SECRET_KEY)
}

const GetUser=(token)=>{
    if(!token) return null;
    return jwt.verify(token,SECRET_KEY)
}
module.exports={SetUser,GetUser}