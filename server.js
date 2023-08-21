const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./src/config/dbConnect');
const app = express();

//env config
dotenv.config();

//Router import
const api = require('./src/routes/api');

//MongoDB connection
connectDB();

//Middleware

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//Routing
app.use("/api/v1", api);

//Port
const PORT = process.env.PORT || 8080 ;

app.listen(PORT, function(){
     console.log(`Server running on  port no ${PORT}`);
 })