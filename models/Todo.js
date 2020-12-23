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

// Reverse populate with virtuals
TodoSchema.virtual('tasks', {
  ref: 'TodoAction',
  localField: '_id',
  foreignField: 'todo',
  justOne: false,
});

// Cascade delete todoaction when a todo is deleted
TodoSchema.pre('remove', async function (next) {
  console.log(`Todoactions bing removed from todo ${this._id}`.green);
  await this.model('TodoAction').deleteMany({ todo: this._id });
  next();
});

module.exports = mongoose.model('Todo', TodoSchema);
