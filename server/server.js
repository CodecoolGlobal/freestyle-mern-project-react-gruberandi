const express = require('express');
const mongoose = require('mongoose');
const AnswerModel = require("./model/answer");
const QuestionModel = require("./model/question");

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



// api/question/search?searchBy=name&search=async
app.get('/api/question/search/', async (req, res) => {
  try {
    const filterBy = req.query.searchBy;
    const keyword = req.query.search;

    const searchRegExp = new RegExp(keyword, 'i');

    const questions = await QuestionModel.find({ [filterBy]: keyword });

    return res.status(200).json(questions);
  }

  catch (err) {
    return next(err);
  }
});

// api/question/sort?sortBy=name&sortDir=asc
app.get('/api/question/sort/', async (req, res) => {
  try {
    const sortBy = req.query.sortBy;
    const sortDirection = req.query.dir;

    const questions = await QuestionModel.sort({ [sortBy]: sortDirection });
    return res.status(200).json(questions);
  }

  catch (err) {
    return next(err);
  }
})
  app.get("/api/question/all", async (req, res, next) => {
    try {
      const questions = await QuestionModel.find();
      res.json(questions);
    } catch (err) {
      next(err);
    }
  });
  
  app.get("/api/question/getOne/:id", async (req, res) => {
    try{
      const question = await QuestionModel.findById(req.params.id);
      res.json(question);
    } catch (err) {
      next(err)
    }
  });
  
  app.post("/api/question/create", async (req, res, next) => {
    try {
      const saved = await QuestionModel.create(req.body);
      return res.json(saved);
    } catch (err) {
      return next(err);
    }
  });


  app.patch("/api/question/update/:id", async (req, res, next) => {
    try {
      const question = await QuestionModel.findByIdAndUpdate(
        req.params.id,
        req.body);
      res.json(question);
    } catch (err) {
      next(err);
    }
  });
  
  app.delete("/api/question/delete/:id", async (req, res, next) => {
    try {
      const deletedQuestion = await QuestionModel.findByIdAndDelete(
        req.params.id
      );
      res.json(deletedQuestion);
    } catch (err) {
      next(err);
    }
  });
// api/question/search?searchBy=name&search=async
app.get('/api/question/search/', async (req, res) => {
  try {
    const filterBy = req.query.searchBy;
    const keyword = req.query.search;

    const searchRegExp = new RegExp(keyword, 'i');

    const questions = await QuestionModel.find({ [filterBy]: keyword });

    return res.status(200).json(questions);
  }

  catch (err) {
    return next(err);
  }
});

// api/question/sort?sortBy=name&sortDir=asc
app.get('/api/question/sort/', async (req, res) => {
  try {
    const sortBy = req.query.sortBy;
    const sortDirection = req.query.dir;

    const questions = await QuestionModel.sort({ [sortBy]: sortDirection });
    return res.status(200).json(questions);
  }

  catch (err) {
    return next(err);
  }
})
  
  app.post("/api/answer/create", async (req, res, next) => {
    try {
      const saved = await AnswerModel.create(req.body);
      console.log(saved)
      return res.json(saved);
    } catch (err) {
      return next(err);
    }
  });

  app.delete("/api/answer/delete/:id", async (req, res, next) => {
    try {
      const deletedAnswer = await AnswerModel.findByIdAndDelete(req.params.id);
      return res.json(deletedAnswer);
    } catch (err) {
      return next(err);
    }
  });


  app.get("/api/answer/getOne/:id", async (req, res) => {
    try {
      const answer = await AnswerModel.findById(req.params.id);
      res.json(answer);
    } catch (err) {
      next(err);
    }
  });


const port = 8080;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});