const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const questionSchema = new Schema({
    
    theme: String,
    question: String,
    timesAsked: Number,
    answeredCorrectly: Number,
    comments: [{
        dateAdded:Date,
        commentText:String
    }],
    isFavorite: Boolean,
    });
    
    const Question = model('Question', questionSchema);
    
    
    module.exports = Question;