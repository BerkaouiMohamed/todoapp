const userModel = require("../models/userModel");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const getLoginPage = asyncHandler((req, res) => {
  res.render("login");
});
const login = asyncHandler(async (req, res) => {
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
      const token = jwt.sign({ _id: existUser._id }, "gomycode", {
        expiresIn: "15min",
      });

      res
        .cookie("user", token, {
          sameSite: false,
        })
        .redirect("/todos");
    }
  }
});

const getRegisterPage = asyncHandler((req, res) => {
    res.render("register");
  })

const register = asyncHandler(async (req, res) => {

    var password = req.body.password;
    const salt = bcrypt.genSaltSync(8);
    password = bcrypt.hashSync(password, salt);

    const user = await userModel.create({ ...req.body, password: password });

    res.redirect("/user/login");

})

const logout = asyncHandler((req, res) => {

    res.clearCookie("user");
    res.redirect("/user/login");

})

module.exports = { getLoginPage, login, getRegisterPage, register, logout };
