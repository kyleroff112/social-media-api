const mongoose = require('mongoose');
const { Schema } = mongoose;
const Thought = require('./Thought');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Middleware to remove user's thoughts when user is deleted
userSchema.pre('remove', async function(next) {
  try {
    await Thought.deleteMany({ username: this.username });
    next();
  } catch (err) {
    console.log(err);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
