const { generateToken } = require("../config/generateToken");
const { User } = require("../model/userModel");

const registerUser = async (req, res) => {
  const { name, email, password, pic } = req.body;
  let userExist;
  if (!name || !email || !password) {
    throw new Error("Please enter all details");
  }

  try {
    userExist = await User.findOne({ email });
  } catch (error) {
    return res.status(400).json(error);
  }

  if (userExist) {
    throw new Error("User already exists");
  }

  const newUser = new User({
    name,
    email,
    password,
    pic,
  });

  try {
    await newUser.save();
  } catch (error) {
    return res.status(500).json(error);
  }

  if (!newUser) {
    throw new Error("Failed to register user");
  }

  const token = generateToken(newUser._id);

  return res.status(200).json({ user: newUser, token });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  let userExist;
  try {
    userExist = await User.findOne({ email });
  } catch (error) {
    return res.status(400).json(error);
  }

  if (!userExist) {
    throw new Error("User not exists");
  }

  await userExist.matchPassword(password);
  const token = generateToken(userExist._id);
  return res.status(200).json({ user: userExist, token });
};

const getAllUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const user = await User.find(keyword).find({ _id: { $ne: req.user._id } });

  return res.status(200).json(user);
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
};
