const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      unique: true,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    telefono: String,
    role: {
      type: String,
      enum: ['user', 'seller'],
      default: 'user',
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true
  }
)

const User = model('User', userSchema)

module.exports = User
