const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRoutes");
require("dotenv").config();
const {
  notFound,
  errorHandler,
} = require("./middleware/errorHandlerMiddleware");
const { chatRouter } = require("./routes/chatRoutes");

const port = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, async () => {
  try {
    await connection;
    console.log("Db connected successfully");
  } catch (error) {
    console.log("error while connecting to db");
    console.log(error);
  }
});
