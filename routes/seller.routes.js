const express = require('express');
const router = express.Router();

/////////////////////////////////////////////////////////////////

//maneja el cifrado de contraseña
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// Cuántas rondas debe bcrypt ejecutar la sal (predeterminado: 10 rondas)
const saltRounds = 10;

// Requerir el modelo de usuario para interactuar con la base de datos
      const Seller = require("../models/Seller.model");


// Requerir el middleware necesario (isLoggedOut e isLiggedIn) para controlar el acceso a rutas específicas
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

// GET /auth/signup
//OBTENER /autenticación/registro
router.get("/seller", isLoggedOut, (req, res) => {
  res.render("auth/seller");
});

// POST /auth/signup
//POST /autorización/registro
router.post("/seller", isLoggedOut, (req, res) => {
  const { name, lastname, company, email, password } = req.body;
    console.log(req.body)
  // Check that username, email, and password are provided
  //Verifique que se proporcione el nombre de usuario, el correo electrónico y la contraseña
  if (name === "" ||  lastname=== "" ||   company === "" || email === "" || password === "") {
    res.status(400).render("auth/seller", {
      errorMessage:
        "All fields are mandatory. Please provide your name, lastname, company, email and password.",
    });

    return;
  }

  if (password.length < 6) {
    res.status(400).render("auth/seller", {
      errorMessage: "Your password needs to be at least 6 characters long.",
    });

    return;
  }

  //   ! This regular expression checks password for special characters and minimum length
  /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res
      .status(400)
      .render("auth/signup", {
        errorMessage: "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter."
    });
    return;
  }
  */

  // Create a new user - start by hashing the password
  bcrypt
    .genSalt(saltRounds)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hashedPassword) => {
      // Create a user and save it in the database
      // Crear un usuario y guardarlo en la base de datos
      return Seller.create({ name, lastname, company, email, password: hashedPassword });
    })
    .then((seller) => {
      res.redirect("/auth/login");
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/seller", { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render("auth/seller", {
          errorMessage:
            "Company and email need to be unique. Provide a valid username or email.",
        });
      } else {
        next(error);
      }
    });
});

// GET /auth/login
router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login");
});

// POST /auth/login
router.post("/login", isLoggedOut, (req, res, next) => {
  const { name, lastname, company, email, password } = req.body;

  // Check that username, email, and password are provided
  // Verifique que se proporcionen el nombre de usuario, el correo electrónico y la contraseña
  if (name === "" ||  lastname=== "" ||   company === "" || email === "" || password === "") {
    res.status(400).render("auth/login", {
      errorMessage:
        "All fields are mandatory. Please provide company, email and password.",
    });

    return;
  }

  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a password
  // - parámetros basados en la longitud o comprobamos la seguridad de una contraseña
  if (password.length < 6) {
    return res.status(400).render("auth/login", {
      errorMessage: "Your password needs to be at least 6 characters long.",
    });
  }

  // Search the database for a user with the email submitted in the form
  // Buscar en la base de datos un usuario con el correo electrónico enviado en el formulario
  User.findOne({ email })
    .then((seller) => {
      // If the user isn't found, send an error message that user provided wrong credentials
      // Si no se encuentra el usuario, envíe un mensaje de error indicando que el usuario proporcionó credenciales incorrectas
      if (!seller) {
        res
          .status(400)
          .render("auth/login", { errorMessage: "Wrong credentials." });
        return;
      }

      // If user is found based on the username, check if the in putted password matches the one saved in the database
      bcrypt
        .compare(password, seller.password)
        .then((isSamePassword) => {
          if (!isSamePassword) {
            res
              .status(400)
              .render("auth/login", { errorMessage: "Wrong credentials." });
            return;
          }

          // Add the user object to the session object
          req.session.currentSeller = seller.toObject();
          // Remove the password field
          delete req.session.currentSeller.password;

          res.redirect("/");
        })
        .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
    })
    .catch((err) => next(err));
});

// GET /auth/logout
router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).render("auth/logout", { errorMessage: err.message });
      return;
    }

    res.redirect("/");
  });
});


module.exports = router;
