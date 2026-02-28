const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decode = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(decode.id).select("-password");
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401);
        throw new Error("Unauthorize user!! please send the token");
      }
    } else {
      res.status(401);
      throw new Error("Unauthorize user!! please send the token");
    }
  } catch (error) {
    res.status(401);
    throw new Error("Unauthorize user!! please send the token");
  }
};
module.exports = protect;
