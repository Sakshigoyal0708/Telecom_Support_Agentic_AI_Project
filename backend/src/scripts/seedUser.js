require("dotenv").config();

const bcrypt = require("bcryptjs");
const sequelize = require("../config/database");
const User = require("../models/User");

async function seedUser() {
  const fullName = process.env.SEED_USER_FULL_NAME || "Test User";
  const email = process.env.SEED_USER_EMAIL || "test@telecom.com";
  const phone = process.env.SEED_USER_PHONE || "9999999999";
  const plainPassword = process.env.SEED_USER_PASSWORD || "Test@123";
  const role = process.env.SEED_USER_ROLE || "user";

  await sequelize.sync();

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      fullName,
      email,
      phone,
      password: hashedPassword,
      role,
      isActive: true,
    },
  });

  if (!created) {
    user.fullName = fullName;
    user.phone = phone;
    user.password = hashedPassword;
    user.role = role;
    user.isActive = true;
    await user.save();
  }

  console.log("User ready for login:");
  console.log({
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    isActive: user.isActive,
  });

  await sequelize.close();
}

seedUser().catch(async (error) => {
  console.error("Failed to seed user:", error);
  await sequelize.close();
  process.exit(1);
});
