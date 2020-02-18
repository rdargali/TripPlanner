const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.get("/", (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
  const username = req.body.registerUserName;
  const password = req.body.registerPassword;

  const newUser = new User({
    username,
    password
  });

  newUser
    .save()
    .then(() => {
      res.json("user added");
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
