const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 
const Users = require("../users/users-model.js");
const { jwtSecret } = require("../config/secrets.js");

router.post('/register', (req, res) => {
  let userInfo = req.body;

  const ROUNDS = process.env.HASHING_ROUNDS || 8;
  const hash = bcrypt.hashSync(userInfo.password, ROUNDS);

  userInfo.password = hash;

  Users.add(userInfo)
    .then(user => {
      delete user.password
      res.status(201).json(user);
    })
    .catch(err => res.status(500).json(err));
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {

          const token = generateToken(user); //get a token
          res.status(200).json({
          token //send the token
        });
      } else {
        res.status(401).json({ message: "You shall not pass! Wrong credentials!" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res
          .status(500)
          .json({
            message:
              "error logging out",
          });
      } else {
        res.status(200).json({ message: "logged out successful" });
      }
    });
  } else {
    res.status(200).json({ message: "You are not logged in!" });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role || "user",
  };

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;