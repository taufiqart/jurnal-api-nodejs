const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const ensureToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader != "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(bearerToken, process.env.SECRET_TOKEN, async (err, data) => {
      let decodeToken = jwt.decode(bearerToken);
      if (decodeToken) {
        let userId = decodeToken.user._id;
        let user = await User.findById(userId);
        user["token"] = bearerToken;
        req.user = user;
        // console.log(user);
      }
      // res.user.token = bearerToken

      if (err) {
        // console.log(err);
        res.status(401);
        res.json({ message: "Invalid Token" });
      } else {
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = ensureToken;
