const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const adminProtect = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(decode.id).select("-password");
      if (user.isAdmin) {
        req.user = user;
        next();
      } else {
        res.status(401);
        throw new Error("you are not a admin");
      }
    } else {
      res.status(401);
      throw new Error("you are not a admin");
    }
  } catch (error) {
    res.status(401);
    throw new Error("you are not a admin");
  }
};
module.exports = adminProtect;
