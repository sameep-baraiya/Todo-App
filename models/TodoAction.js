const mongoose = require('mongoose');

const TodoActionSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, 'Please add a task'],
      trim: true,
      maxlength: [50, 'Task can not be more than 20 characters'],
    },
    isDone: {
      type: Boolean,
      required: [true, 'Please add a isDone'],
      default: false,
    },
    todo: {
      type: mongoose.Schema.ObjectId,
      ref: 'Todo',
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model('TodoAction', TodoActionSchema);
