import express from 'express';
import mongoose from 'mongoose';
import Answer from './model/Answer';
import Question from './model/Question';

const app = express();
app.use(express.json())


//MongoDB import
const mongoURI = 'mongodb+srv://PAlet:1234@cluster0.mxdljml.mongodb.net/';
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
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








const port = 8080;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});