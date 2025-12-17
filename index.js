const express= require('express');
const cors= require('cors');
const mongoose= require("mongoose");
const cookieParser = require('cookie-parser');
const {CheckAuth}= require('./middleware/auth.js');
const {AddBlogs}= require('./controllers/blogs.js')
const multer = require('multer');
const path = require('path');
const app= express();

const router= require('./routes/route.js');
require('dotenv').config(); 

const PORT= process.env.PORT || 8080;
const DB_HOST= process.env.DB_HOST

mongoose.connect(DB_HOST).then
(()=>console.log("Mongo Connectd")).catch
((error)=>console.log(error));

app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}));
app.set('trust proxy', 1);
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(express.json());
app.use('/api',router);


const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, path.resolve('./public/uploads'));

  },

  filename: function (req, file, cb) {

    const filename = `${Date.now()}-${file.originalname}`;

    cb(null, filename);

  }

});



const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.resolve('./public/uploads')));

app.post('/api/addblog',CheckAuth,upload.single('avatar'),AddBlogs);

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})