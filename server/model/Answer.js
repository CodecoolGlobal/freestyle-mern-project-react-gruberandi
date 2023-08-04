const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const answerSchema = new Schema({
   
    answers: [{
        answer: String,
        correct: Boolean,
    }],
    answersWhichQuestion: {type: Schema.Types.ObjectId, ref: 'Question'},
    });
    
    const Answer = model('Answer', answerSchema);
    
    
    module.exports = Answer;