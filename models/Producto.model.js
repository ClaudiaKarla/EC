const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const productoSchema = new Schema(
  {
    categoria: {
      type: String,
      required: true,
      enum:["mujer",
      "hombre",
      "niños",
      "joyeria y relojes",
      "belleza", 
      "electronica", 
      "deportes"]
    },
    producto: {
      type: String,
      required: true,
    },

    precio: {
      type: Number,
    },
    descripcion: {
      type: String,
    },
    existencia: {
      type: Number,
    },
    fotos:[String],
  },
  {
    // this second object adds extra properties: createdAt and updatedAt
    timestamps: true
  })

const Producto = model('Producto', productoSchema)

module.exports = Producto