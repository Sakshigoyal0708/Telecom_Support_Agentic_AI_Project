const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Telecom Intelligence 🚀",
  });
});

app.get('/user', (req, res) => {
  //Perform any operation
const {}=req.body;
  res.json({
    status:200,
    response: "User data fetched successfully",
  })
});

module.exports = app;