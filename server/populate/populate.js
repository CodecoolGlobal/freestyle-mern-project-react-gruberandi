const mongoose = require('mongoose');
const AnwserModel = require('../model/Answer');
const QuestionModel = require('../model/Question');
const workbook = require('./workbook.json');

const mongoURL = 'mongodb+srv://PAlet:1234@cluster0.mxdljml.mongodb.net/';

const populate = async () => {
    
    await QuestionModel.deleteMany({});
    await AnwserModel.deleteMany({});

    const allQuestions = [];
    const allAnswers = [];

    workbook.questions.forEach((curr, id) => {
        allQuestions.push(
            {
                _id: id,
                theme: curr.theme,
                question: curr.question,
                timesAsked: 0,
                answeredCorrectly: 0,
                comments: [],
                isFavorite: false,
            }
            );
        allAnswers.push(
            {
                _id: id,
                answers: [...curr.answers],
                answersWhichQuestion: id,
            }
            );
    });

		await QuestionModel.create(...allQuestions);
		console.log('Added Questions');
		await AnwserModel.create(...allAnswers);
		console.log('Added Answers');
}

const main = async () => {
    await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
    await populate();
    await mongoose.disconnect();
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
  