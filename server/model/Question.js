const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const questionSchema = new Schema({
    ID: String,
    question_text: String,
    answers: String,
    counter: Number,
    theme: String,
    comments:String,
    });
    
    const Question = model('Question', questionSchemaS);
    
    
    module.exports = Question;