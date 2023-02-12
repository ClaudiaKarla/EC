const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true
    },
    apellido: {
      type: String,
      required: true
    },

    nombreDeUsuario: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    contraseña: {
      type: String,
      required: true,
    },
    telefono:String,
    role:{
      type:String,
      enum:["cliente", "vendedor", "admin"],
      default:"cliente"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
