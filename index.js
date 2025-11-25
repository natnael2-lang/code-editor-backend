const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { login, register, createQuestion, submitAnswer } = require("./controllers/auth");

const app = express();


app.use(express.json());       
app.use(cors({
  origin: "https://code-editor-front-nine.vercel.app",
  credentials: true
}));               


mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB failed to connect", err));


app.post("/login", login);        
app.post("/login/:id", login);  
app.post("/register", register);
app.post("/createQuestion", createQuestion);
app.post("/submiteResult", submitAnswer);


app.get("/question", (req, res) => {
  res.send("Questions endpoint");
});


app.listen(process.env.PORT || 3000, () => 
  console.log("Server is listening")
);