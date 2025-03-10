const jwt = require("jsonwebtoken");

function generateToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
}

module.exports = { generateToken };
