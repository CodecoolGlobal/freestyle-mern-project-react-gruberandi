const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const questionSchema = new Schema({
    
    _id: Number,
    theme: String,
    question: String,
    timesAsked: Number,
    comments: [{
        dateAdded:Date,
        commentText:String
    }],
    isFavorite: Boolean,
    });
    
    const Question = model('Question', questionSchema);
    
    
    module.exports = Question;