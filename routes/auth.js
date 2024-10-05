const express = require("express");
const router = express.Router({ mergeParams: true });
const { responseHandler, genericError } = require("../services/responses");
const {
  createUser,
  findUserByIdentifier,
} = require("../controllers/userController");
const { sanitizeData } = require("../services/sanitation");
const { registerSchema, loginSchema } = require("../schemas/auth.schema");
const { generateToken } = require("../controllers/tokenController");
const { compare } = require("bcryptjs");

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const { error } = sanitizeData(registerSchema, {
      email,
      username,
      password,
    });

    if (error) return responseHandler(res, 403, error.details[0].message); // Error message for invalid data

    const newUser = await createUser({ email, username, password });

    if (!newUser || newUser === null) {
      return responseHandler(res, 400, "User not created");
    }

    if (newUser.errors) {
      switch (newUser.errors[0].message) {
        case "email must be unique":
          return responseHandler(res, 409, "Email already in use");
        case "username must be unique":
          return responseHandler(res, 409, "Username already in use");
        default:
          return genericError(res, newUser.errors);
      }
    } // Error message for duplicate data or other errors

    return responseHandler(res, 201, "User created", newUser);
  } catch (error) {
    return genericError(res, error);
  }
});

router.post("/login", async (req, res) => {
  const { identifier, password } = req.body;
  const { error } = sanitizeData(loginSchema, { identifier, password });

  if (error) return responseHandler(res, 403, error.details[0].message);

  const user = await findUserByIdentifier(identifier);

  if (!user) {
    return responseHandler(res, 401, "Invalid credentials");
  }

  const matchPassword = await compare(password, user.password); // Compare the pwd from req with the hashed pwd in the db

  if (!matchPassword) {
    return responseHandler(res, 401, "Invalid credentials");
  }

  const token = generateToken(user.id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 1000,
  }); // Set the token in a cookie

  return responseHandler(res, 200, "Login successful", { token });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  return responseHandler(res, 200, "Logout successful");
});

module.exports = router;
