import express from 'express';
import mongoose from 'mongoose';
import Answer from './model/Answer';
import Question from './model/Question';

const app = express();
app.use(express.json())


//MongoDB import
  const mongoURI = 'mongodb+srv://gruberandi1:Mongodb2023.07.25@cluster0.rdswgbb.mongodb.net/test';
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });









const port = 8080;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});