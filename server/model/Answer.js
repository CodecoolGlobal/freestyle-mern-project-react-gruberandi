const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const answerSchema = new Schema({
   
    _id: Number,
    answers: [{
        answer: String,
        correct: Boolean,
    }],
    answersWhichQuestion: {type: Schema.Types.ObjectId, ref: 'Question'},
    //Schema.Types.ObjectId
    });
    
    const Answer = model('Answer', answerSchema);
    
    
    module.exports = Answer;