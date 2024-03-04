import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
  des: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
{
  timestamps: true
});

export const Task = mongoose.model('Task', taskSchema);