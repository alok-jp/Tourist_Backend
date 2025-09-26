const express = require("express");
const { login,signup, update} = require("../controllers/authController");


const router = express.Router();

const userRouter = express.Router();

//============================================== Routes =============================================//

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/update", update);

module.exports = userRouter;