require("dotenv").config();
const express =  require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


//specifying port
const port = process.env.PORT || 2000;

//setting connection b/w node and database
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/nodepractice", {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(() =>{
    console.log("Connected to Database!");

    //setting listening port
    app.listen(port, () => {
        console.log(`Server Running on Port ${port}`);
    });
})
.catch((err) =>{
    console.log(err);
});

//middlewares
app.use(
    cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
);
app.use(bodyParser.json());

// importing routes
const userRoutes = require('./routes/user.routes');

//routes
app.use(userRoutes);