const { Router } = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/userController");
const { authentication } = require("../middleware/authMiddleware");

const userRouter = Router();

userRouter.post("/", registerUser);
userRouter.get("/", authentication, getAllUsers);
userRouter.post("/login", loginUser);

module.exports = { userRouter };
