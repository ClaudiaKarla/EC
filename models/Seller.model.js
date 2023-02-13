const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const sellerSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true
    },
    apellido: {
      type: String,
      required: true
    },

    empresa: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    contraseña: {
      type: String,
      required: true
    },
    telefono:String,
 
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Seller = model("Seller", sellerSchema);

module.exports = Seller;
