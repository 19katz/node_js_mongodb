// imports in mongoose to be able to use MongoDB
const mongoose = require('mongoose');
// create a new MongoDB schema for todo tasks that has
// content and creation date
const todoTaskSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// Models are constructors compiled from Schema definitions.
// Models will create and read documents from MongoDB.
module.exports = mongoose.model('TodoTask', todoTaskSchema);