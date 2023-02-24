const { Router } = require("express");
const { registerUser, loginUser } = require("../controllers/userController");

const userRouter = Router();

userRouter.post("/", registerUser);
userRouter.post('/login', loginUser)

module.exports = { userRouter };
