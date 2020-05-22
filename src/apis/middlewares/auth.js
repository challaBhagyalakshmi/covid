const jwt = require("jsonwebtoken");
const user = require("../../db/Models/user.js");

const User = user.User;
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = await jwt.verify(token, "covid19");
    const user = await findUser(decoded);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

async function findUser(decoded) {
  const user = await User.findOne({
    where: {
      id: decoded.id,
    },
  });
  if (!user) {
    throw new Error("Invalid user!");
  }
  return user;
}
module.exports = { auth };
