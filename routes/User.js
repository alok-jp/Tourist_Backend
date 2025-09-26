const express = require("express");
const { login } = require("../controllers/authController");
const router = express.Router();

const userRouter = express.Router();

userRouter.post("/login", login);

module.exports = userRouter;