const { Router } = require("express");
const {
  getChats,
  accessChats,
  createGroups,
  renameGroups,
  removeFromGroups,
  addToGroups,
} = require("../controllers/chatController");
const { authentication } = require("../middleware/authMiddleware");

const chatRouter = Router();

chatRouter.get("/", authentication, getChats);
chatRouter.post("/", authentication, accessChats);
chatRouter.post("/group", authentication, createGroups);
chatRouter.put("/rename", authentication, renameGroups);
chatRouter.post("/removeGroup", authentication, removeFromGroups);
chatRouter.post("/addGroup", authentication, addToGroups);

module.exports = { chatRouter };
