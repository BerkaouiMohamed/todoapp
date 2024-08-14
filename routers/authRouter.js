const {
  getLoginPage,
  register,
  login,
  getRegisterPage,
  logout,
} = require("../controllers/authcontrollers");

const authRouter = require("express").Router();

authRouter.get("/login", getLoginPage);
authRouter.post("/login", login);


authRouter
  .route("/register")
  .get(getRegisterPage)
  .post( register);

  authRouter.get("/logout",logout );
  module.exports=authRouter