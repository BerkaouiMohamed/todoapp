var jwt = require("jsonwebtoken");
const todoModel = require("../models/todoModel");
const userModel = require("../models/userModel");
const getTodos=async (req, res) => {
    try {
      const token = req.cookies.user;
  
      if (!token) {
        res.redirect("/user/register");
      } else {
        var a;
        jwt.verify(token, "gomycode", async (err, decode) => {
          if (err) {
            res.clearCookie("user");
            res.redirect("/user/login");
          }
          a = decode;
        });
  
        const todos = await todoModel.find({ user: a._id });
        const user = await userModel.findById(a._id);
  
        res.render("home", { todos, user });
      }
    } catch (error) {
      console.log(error);
    }
  }
  const addTodo= async function (req, res) {
    try {
      const token = req.cookies.user;
      if (!token) {
        res.redirect("/user/register");
      } else {
        var a;
        jwt.verify(token, "gomycode", async (err, decode) => {
          if (err) {
            res.clearCookie("user");
            res.redirect("/user/login");
          }
          a = decode;
        });
  
        await todoModel.create({ ...req.body, user: a._id });
        res.redirect("/todos");
      }
    } catch (error) {
      console.log(error);
    }
  }

  module.exports={getTodos,addTodo}