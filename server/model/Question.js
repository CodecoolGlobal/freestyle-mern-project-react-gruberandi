const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const questionSchema = new Schema({
    name: String,
    description: String,
    timesAsked: Number,
    topic: [String],
    comments: [{
        dateAdded:Date,
        commentText:String
    }],
    isFavourite: Boolean,
    });
    
    const Question = model('Question', questionSchema);
    
    
    module.exports = Question;