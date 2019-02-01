const express = require("express");
const authrouter = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");
const models = require("../models");
const validateRegistration = require("../validations/register");
const validateLogin = require("../validations/login");

authrouter.route("/register").post(async (req, res) => {
  const { errors, isValid } = validateRegistration(req.body);
  const { name, email, password } = req.body;
  if (!isValid) {
    return res.status(200).json(errors);
  }

  try {
    const user = await models.User.findOne({ where: { email: email } });
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      if (hashedPassword) {
        const created = await models.User.create({
          name,
          email,
          password: hashedPassword,
          avatar
        });
        if (created)
          return res.status(201).json({
            success: true,
            message: "Successfully created a new user"
          });
      }
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
});

authrouter.route("/login").post(async (req, res) => {
  const { isValid, errors } = validateLogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;
  console.log(JSON.stringify(req.body));

  try {
    const user = await models.User.findOne({ where: { email: email } });
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    console.log("Password", user.password);

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      errors.password = "Password is incorrect";
      return res.status(400).json(errors);
    }
    const payload = { id: user.id, name: user.name, avatar: user.avatar };
    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
      return res.status(200).json({
        success: true,
        token: `Bearer ${token}`
      });
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
});

authrouter.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = authrouter;
