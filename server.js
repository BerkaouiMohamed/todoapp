const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const todoModel = require("./models/todoModel");
const userModel = require("./models/userModel");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var cookies = require("cookie-parser");

//connect to db
mongoose
.connect(process.env.MONGO_URI, { dbName: "todoApp" })
.then(() => {
    console.log("db connected");
})
.catch((e) => console.log(e));

const app = express();
//middelwares
app.use(cookies());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

//endpoints
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const password = req.body.password;

    const existUser = await userModel.findOne({ userEmail: userEmail });
    if (!existUser) {
      res.send("user not existed");
    } else {
      const testPassword = bcrypt.compareSync(password, existUser.password);

      if (!testPassword) {
        res.send("wrong password");
      } else {
        const token = jwt.sign({ _id: existUser._id }, "gomycode",{expiresIn:"15min"});
        console.log(token);
        res.cookie("user",token,{sameSite:true, secure: true
        }).redirect('/')
      }
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/register", async (req, res) => {
  try {
    var password = req.body.password;
    password = bcrypt.hashSync(password, 8);
    const user = await userModel.create({ ...req.body, password: password });
    console.log(user);
    res.redirect("/register");
  } catch (error) {
    console.log(error);
  }
});

app.get("/", async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.render("home", { todos });
  } catch (error) {
    console.log(error);
  }
});

app.post("/add", async function (req, res) {
  try {
  
    const token=req.cookies.user
    const decode=jwt.verify(token, "gomycode")
    
    console.log(decode)
    await todoModel.create({...req.body,user:decode._id});
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

//server listinning
mongoose.connection.once("open", () => {
  app.listen(process.env.PORT, () =>
    console.log(`server runinng on port ${process.env.PORT}`)
  );
});
