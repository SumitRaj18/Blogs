const express= require('express'); 
const { handleUserSignup, handleUserLogin, handleLogout } = require('../controllers/user');
const { handleUserLoggedIn,CheckAuth } = require('../middleware/auth.js');
const { AllBlogs, AllUserBlogs, SpecificBlog, DeleteBlog, AddBlogs } = require('../controllers/blogs.js');
const {AddComment,ShowComments} = require('../controllers/comment.js')


const router= express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//        cb(null, path.resolve('../public/uploads')); 
//   },
//   filename: function (req, file, cb) {
//     const filename = `${Date.now()}-${file.originalname}`; 
//     cb(null, filename);
//   }
// });

// const upload = multer({ storage: storage });

// router.use('/uploads', express.static(path.resolve('../public/uploads')));


router.post('/signup',handleUserSignup);
router.post('/login',handleUserLogin);
router.post('/logout',handleLogout);

router.get('/allblogs',handleUserLoggedIn,AllBlogs);
router.get('/allusersblogs',AllUserBlogs)
router.get('/allusersblogs/:id',SpecificBlog)
router.delete('/deleteblog/:id',CheckAuth,DeleteBlog);

// router.post('/addblog',CheckAuth,upload.single('avatar'),AddBlogs); 

router.post('/addcomment/:id',CheckAuth,AddComment);
router.get('/allcomment/:id',ShowComments);
// routes/route.js
router.get('/me', handleUserLoggedIn, (req, res) => {
    return res.status(200).json({ user: req.user });
});


module.exports=router;