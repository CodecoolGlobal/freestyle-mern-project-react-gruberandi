const mongoose = require('mongoose');
const AnwserModel = require('../model/Answer');
const QuestionModel = require('../model/Question');
const workbook = require('./workbook.json');

const mongoURL = 'mongodb+srv://PAlet:1234@cluster0.mxdljml.mongodb.net/';

const populate = async () => {


    await QuestionModel.deleteMany({});
    await AnwserModel.deleteMany({});

    const allAnswers = [];

    const createPromises = workbook.questions.map(async (curr) => {
        const created = await QuestionModel.create({
            theme: curr.theme,
            question: curr.question,
            timesAsked: 0,
            answeredCorrectly: 0,
            comments: [],
            isFavorite: false,
        });
    const createPromises = workbook.questions.map(async (curr) => {
        const created = await QuestionModel.create({
            theme: curr.theme,
            question: curr.question,
            timesAsked: 0,
            answeredCorrectly: 0,
            comments: [],
            isFavorite: false,
        });
        allAnswers.push(
            {
                answers: [...curr.answers],
                answersWhichQuestion: created._id,
                answersWhichQuestion: created._id,
            }
        );
        );
    });

    await Promise.all(createPromises);
    await AnwserModel.create(...allAnswers);
    console.log('Added Answers');
    await Promise.all(createPromises);
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
