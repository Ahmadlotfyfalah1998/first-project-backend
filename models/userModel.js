import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  
},
{
  timestamps: true
});

export const User = mongoose.model('User', userSchema);