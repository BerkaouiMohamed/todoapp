const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
var cookies = require("cookie-parser");
const dbConnection = require("./utils/dbConnection");

const authRouter = require("./routers/authRouter");
const todoRouter = require("./routers/todoRouter");

//connect to db

dbConnection();
const app = express();
//middelwares
app.use(cookies());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

//endpoints
app.use('/user',authRouter)

app.use('/todos',todoRouter)

app.use((e,req,res,next)=>{
  res.send(e)
})


//server listinning
mongoose.connection.once("open", () => {
  app.listen(process.env.PORT, () =>
    console.log(`server runinng on port ${process.env.PORT}`)
  );
});
