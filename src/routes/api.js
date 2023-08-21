const express = require("express");
const userController = require("../controller/userController");
const blogController = require("../controller/blogController");

const router = express.Router();

// ============ Register New User Api ============
router.post('/register', userController.register);

// ============ Login User Api ============
router.post("/user-login", userController.login);

// ============ Get All User Api ============
router.get('/all-users', userController.getAllUsers);

// ============ Create BLog Api ============
router.post("/create-blog", blogController.createBlog);


// ============ Get All Blogs ============
router.get("/all-blogs", blogController.getAllBlogs);

// ============ Update Blogs ============
router.put("/update-blog/:id", blogController.updateBlog);

// ============ Single Blog Details ============
router.get("/get-single-blog/:id", blogController.getSingleBlog);

// ============ Delete BLogs ============
router.delete("/delete-blog/:id", blogController.deleteBlog);



module.exports = router;