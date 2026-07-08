const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const PASSWORD_POLICY_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const PHONE_REGEX = /^\d{10}$/;

function isEmailValid(email) {
  const value = String(email || "").trim();
  const atIndex = value.indexOf("@");
  const dotIndex = value.lastIndexOf(".");
  return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < value.length - 1;
}

function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    },
    process.env.JWT_SECRET || "telecom-dev-jwt-secret",
    { expiresIn: "1h" }
  );
}

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await User.findOne({ where: { email: normalizedEmail } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    if (!user.isActive) {
      return res.status(403).json({ error: "User account is inactive." });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    user.lastLoginAt = new Date();
    await user.save();

    const token = createToken(user);
    return res.json({
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Login failed. Please try again." });
  }
});

router.post("/register", async (req, res) => {
  const { fullName, email, phone, password, role } = req.body;

  if (!fullName || !email || !phone || !password) {
    return res.status(400).json({ error: "Full name, email, phone, and password are required." });
  }

  try {
    const normalizedFullName = String(fullName).trim();
    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedPhone = String(phone).replace(/\D/g, "").slice(0, 10);

    if (normalizedFullName.length < 3 || normalizedFullName.length > 80) {
      return res.status(400).json({ error: "Full name must be between 3 and 80 characters." });
    }

    if (!isEmailValid(normalizedEmail)) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }

    if (!PHONE_REGEX.test(normalizedPhone)) {
      return res.status(400).json({ error: "Phone number must be exactly 10 digits." });
    }

    if (!PASSWORD_POLICY_REGEX.test(String(password))) {
      return res.status(400).json({
        error:
          "Password must include uppercase, lowercase, number, and special character, and be at least 8 characters long.",
      });
    }

    const existingUser = await User.findOne({ where: { email: normalizedEmail } });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists with this email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName: normalizedFullName,
      email: normalizedEmail,
      phone: normalizedPhone,
      password: hashedPassword,
      role: role === "admin" ? "admin" : "user",
      isActive: true,
    });

    const token = createToken(user);
    return res.status(201).json({
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ error: "Registration failed. Please try again." });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.json({
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Me endpoint error:", error);
    return res.status(500).json({ error: "Failed to fetch current user." });
  }
});

router.post("/logout", authMiddleware, (req, res) => {
  // JWT is stateless; client should remove token after this acknowledgement.
  return res.json({
    success: true,
    message: "Logged out successfully.",
  });
});

module.exports = router;
