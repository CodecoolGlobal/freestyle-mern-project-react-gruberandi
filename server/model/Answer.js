const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const answerSchema = new Schema({
   
    true_answer: String,
    false_answer_1:String,
    false_answer_2: String,
    answersWhichQuestion: {type: Schema.Types.ObjectId, ref: 'Question'},
    
    });
    
    const Answer = model('Answer', answerSchema);
    
    
    module.exports = Answer;