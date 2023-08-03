const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const answerSchema = new Schema({
   
    _id: Number,
    answers: [{
        answer: String,
        correct: Boolean,
    }],
    answersWhichQuestion: {type: Number, ref: 'Question'},
    //Schema.Types.ObjectId
    });
    
    const Answer = model('Answer', answerSchema);
    
    
    module.exports = Answer;