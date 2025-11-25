const User=require("../model/user");
const Answer=require("../model/answer")
const Question=require("../model/question")



const register = async (req, res) => {
    console.log("in register controller")
  try {
    const { firstname, lastname, email, password,role } = req.body.data;


    if (!firstname || !lastname || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }


    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password,  
      role
    });

    console.log("register ",newUser)

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { id:questionId} = req.params;

    if (!email || !password) {
      return res.status(400).json({ message: "invalid input" });
    }


    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "email not found" });

    if (user.password !== password) {
      return res.status(401).json({ message: "incorrect password" });
    }


    if (user.role === "admin") {
      return res.status(200).json({
        message: "admin login",
        role: "admin",
        

      });
    }
    if(!questionId){
      return res.status(200).json({message:"no questionId",role:"user"})
    }

    

   
    const existing = await Answer.findOne({ questionId, userId: user._id });
    console.log("existing ",existing)

    if (!existing) {
     
      const newAnswer = await Answer.create({
        questionId,
        userId: user._id,
        answer: "pending",
        status: "pending"
      });
      console.log("new answer ",newAnswer)
      const questions=await Question.findById(questionId);
      console.log("question data ",questions.questions)

      return res.status(200).json({
        message: "user login - question assigned",
        role: "user",
        data: questions.questions
      });
    }

   return res.status(200).json({
    message: "user login - question already assigned",
    role: "user",
    data: existing
  });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const createQuestion = async (req, res) => {
    console.log("in createQuestion")
  try {
    const questions = req.body.data;
   
    console.log("data ",req.body)
  


    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Questions array is required" });
    }




    const newQuestion = await Question.create({
      questions,
    
    });
    console.log("new question",newQuestion)

    return res.status(201).json({
      message: "Question created successfully",
      data: newQuestion
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const submitAnswer = async (req, res) => {
  try {
    const { answer } = req.body;
    const { answerId } = req.params;

    const userAnswer = await Answer.findById(answerId);
    if (!userAnswer) {
      return res.status(404).json({ message: "Answer entry not found" });
    }

 
    if (userAnswer.status === "success" || userAnswer.status === "failed") {
      return res.status(400).json({
        message: "Answer already submitted",
        currentStatus: userAnswer.status
      });
    }

    
    if (!answer || answer.trim() === "") {
      userAnswer.answer = "";
      userAnswer.status = "failed";
      await userAnswer.save();

      return res.status(200).json({
        message: "Answer submitted but empty",
        status: "failed",
        data: userAnswer
      });
    }

  
    userAnswer.answer = answer;
    userAnswer.status = "success";
    await userAnswer.save();

    return res.status(200).json({
      message: "Answer submitted successfully",
      status: "success",
      data: userAnswer
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};



module.exports = { submitAnswer,login,register,createQuestion };
