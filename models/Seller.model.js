const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const sellerSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },

    company: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    telefono: String
  },
  {
    // this second object adds extra properties: createdAt and updatedAt
    timestamps: true
  }
)

const Seller = model('Seller', sellerSchema)

module.exports = Seller
