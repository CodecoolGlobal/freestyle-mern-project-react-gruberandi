const express = require('express');
const mongoose = require('mongoose');
const AnswerModel = require("./model/Answer");
const QuestionModel = require("./model/Question");

const app = express();
app.use(express.json())

//MongoDB import
const mongoURL = 'mongodb+srv://PAlet:1234@cluster0.mxdljml.mongodb.net/';

mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// api/question/sort?sortBy=name&sortDir=asc
  app.get("/api/question/", async (req, res, next) => {
    try {
      const questions = await QuestionModel.find({});
      res.json(questions);
    } catch (err) {
      next(err);
    }
  });
  
  app.get("/api/question/:id", async (req, res, next) => {
    try{
      const question = await QuestionModel.findById(req.params.id);
      res.json(question);
    } catch (err) {
      next(err)
    }
  });
  
  app.get("/api/stats/", async (req, res) => {
    const stats = {
      asked: 0,
      correct: 0,
      ratio: 0,
    }

    const questions = await QuestionModel.find({})
    for (question of questions) {
      stats.asked += question.timesAsked;
      stats.correct += question.answeredCorrectly;
    };

    stats.ratio = (stats.correct / stats.asked).toPrecision(2);  
    res.json(stats);
  });

  app.post("/api/question/", async (req, res, next) => {
    try {
      const saved = await QuestionModel.create(req.body);
      return res.json(saved);
    } catch (err) {
      return next(err);
    }
  });


  app.patch("/api/question/:id", async (req, res, next) => {
    console.log("req:", req.body);
    try {
      const question = await QuestionModel.findByIdAndUpdate(
        req.params.id,
        req.body);
        return res.json(question);
    } catch (err) {
      next(err);
    }
  });
  
  app.delete("/api/question/:id", async (req, res, next) => {
    try {
      const deletedQuestion = await QuestionModel.findByIdAndDelete(
        req.params.id
      );
      res.json(deletedQuestion);
    } catch (err) {
      next(err);
    }
  });


// api/question/sort?sortBy=name&sortDir=asc

  app.post("/api/answer/", async (req, res, next) => {
    try {
      const saved = await AnswerModel.create(req.body);
      console.log(saved)
      return res.json(saved);
    } catch (err) {
      return next(err);
    }
  });

  app.delete("/api/answer/:id", async (req, res, next) => {
    try {
      const deletedAnswer = await AnswerModel.findOneAndDelete({answersWhichQuestion: req.params.id});
      return res.json(deletedAnswer);
    } catch (err) {
      return next(err);
    }
  });

  app.get("/api/answer/:id", async (req, res, next) => {
    try {
      const answer = await AnswerModel.findOne({answersWhichQuestion: req.params.id});
      res.json(answer);
    } catch (err) {
     return next(err);
    }
  });


const port = 8080;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});