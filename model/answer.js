const mongoose=require("mongoose");
const   Question=require("./question");
const User=require("./user");

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answer: { type: String,default:"pending" },
  status: { type: String, enum: ["pending","success", "failed","no"], default: "no" }
}, { timestamps: true });

const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;