// 1. Require mongoose
const mongoose = require('mongoose');


// 2. Create a Schema for our todo modem (todoSchema)
const todoSchema = new mongoose.Schema({
  description: {
    type: String, 
    required: true
  }, 
  completed: {
    type: Boolean, 
    require: false, 
    default: false
  }
})

// 3. Connect our schema to our model
const Todo = mongoose.model("Todo", todoSchema);


// 4. Export it so it's available elsewhere
module.exports = Todo;