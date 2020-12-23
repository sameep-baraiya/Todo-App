const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      maxlength: [20, 'Name can not be more than 20 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      trim: true,
      maxlength: [100, 'Description can not be more than 100 characters'],
    },
    todos: { type: Array, default: [] },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model('Todo', TodoSchema);
