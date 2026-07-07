const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

// Example login route: replace with real user lookup + password verification.
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  // TODO: replace this with a real database lookup and password check
  const user = { id: 1, email };

  const token = createToken(user);
  res.json({ token });
});

module.exports = router;
