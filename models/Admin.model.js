const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const adminSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true
    },
    apellido: {
      type: String,
      required: true
    },

    username: {
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

const Admin = model("Admin", adminSchema);

module.exports = Admin;
