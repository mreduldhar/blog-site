const mongoose = require('mongoose');

const connectDB = async () =>{
     try {
          await mongoose.connect(process.env.MONGO_URL);
          console.log(`Connected to Mongodb`);
     } catch (error) {
          console.log(`Connect Error ${error}`);
     }

};

module.exports = connectDB;