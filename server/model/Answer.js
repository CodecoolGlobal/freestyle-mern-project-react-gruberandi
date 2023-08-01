const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const answerSchema = new Schema({
    ID: String,
    answer_text: String,
    });
    
    const Answer = model('Answer', answerSchema);
    
    
    module.exports = Answer;