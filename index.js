const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require('multer');
const path = require('path');
const createError = require('http-errors');
const dotenv = require('dotenv');
dotenv.config();


const app = express();

const port = process.env.PORT || 8000;

// Routes
const destRoutes = require("./src/routes/destinations");
const authRoutes = require("./src/routes/auth");

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },
    filename: (req,file,cb) => {
      cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

app.get('/', async (req, res, next) => {
  res.send('Hello!')
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    }
  })
})

const fileFilter = (req, file, cb) => {
  if(
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ){
    cb(null, true);
  }else{
    cb(null, false)
  }
}

// Middleware for bodyParser
app.use(bodyParser.json()); //type JSON
app.use('/images', express.static(path.join(__dirname,'images')))
app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
  }).single('image'));
  
// Middleware for CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
// Middleware for error dinamis
app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data})
})

app.use("/v1/auth", authRoutes);
app.use("/v1/destination", destRoutes);

// Connection MongoDB
mongoose.set('strictQuery', true);
mongoose.connect( process.env.MONGO_URI)
.then(() => {
    app.listen(port, () => console.log('Connection Success'));
})
.catch(err => console.log(err));
