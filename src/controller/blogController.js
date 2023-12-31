const mongoose = require('mongoose');
const blogModel = require('../model/blogModel');
const userModel = require('../model/userModel');


//Create Blog
exports.createBlog = async (req, res) => {
     try {
          const { title, description, image, user } = req.body;

          //validation
          if(!title || !description || !image || !user){
               return res.status(201).send({
                    'success': false,
                    'message': 'Please provide all fields'
               });
          };
          
          const existingUser = await userModel.findById(user);

          //validation
          if(!existingUser){
               return res.status(404).send({
                    'success': false,
                    'message': 'Not Found'
               })
          }

          const newBlog = new blogModel({ title, description, image, user});
          
          //Add session
          const session = await mongoose.startSession();
          session.startTransaction();
          await newBlog.save({ session });
          existingUser.blogs.push(newBlog);
          await existingUser.save({ session });
          await session.commitTransaction();

          await newBlog.save();

          return res.status(201).send({
               'success': true,
               'message': 'Blog Created!',
               newBlog,
          })

     } catch (error) {
          console.log(error);
          return res.status(400).send({
               'success':false,
               'message': 'Error While Creating Blog',
               error,
          })
     }
}

//Get all blogs
exports.getAllBlogs = async (req, res) => {
     try {
          const blogs = await blogModel.find({});

          //validator
          if(!blogs){
               return res.status(200).send({
                    'success': false,
                    'message': 'No Blogs Found',
               });
          }
          return res.status(200).send({
               'success': true,
               'BlogCount': blogs.length,
               'message': 'All blogs lists',
               blogs
          });

     } catch (error) {

          console.log(error)
          return res.status(500).send({
               'success': false,
               'message': 'Error While Getting Blogs',
               error
          })
          
     }
}


// Update Blog
exports.updateBlog = async (req, res) => {
     try {
          const { id } = req.params;
          const { title, description, image} = req.body;

          const blog = await blogModel.findByIdAndUpdate(
               id, 
               {...req.body}, 
               {new: true}
          );

          return res.status(200).send({
               'success': true,
               'message': 'Blog Updated',
               blog,
          })
     } catch (error) {
          console.log(error);
          return res.status(400).send({
               'success': false,
               'message': 'Error While Updating Blog',
               error,
          })
     }
}

//Get Single Blog
exports.getSingleBlog = async (req, res) => {
     try {
          
          const { id } = req.params;
          const blog = await blogModel.findById(id);

          //validation
          if(!blog){
               return res.status(404).send({
                    'success': false,
                    'message': 'Blog not found with this id'
               })
          };

          return res.status(200).send({
               'success': true,
               'message': 'Found single blog',
               blog,
          });

     } catch (error) {

          console.log(error);
          return res.status(400).send({
               'success': false,
               'message': 'Error while getting single blog',
               error,
          });
     };
};

//Delete Blog
exports.deleteBlog = async (req, res) => {
     try {
          
          const blog = await blogModel.findOneAndDelete(req.params.id).populate("user");

          await blog.user.blogs.pull(blog);
          await blog.user.save();

          return res.status(200).send({
               'success': true,
               'message': 'Blog Deleted!',
          });

     } catch (error) {
          
          console.log(error);
          return res.status(400).send({
               'success': false,
               'message': 'Error while deleting blog',
               error,
          });
     };
};

