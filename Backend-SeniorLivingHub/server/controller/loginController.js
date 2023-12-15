var ResidentDb = require("../model/residentDb");
var MedicalStaffDb = require("../model/medicalStaffDb");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password, userType } = req.body;

  if (!email || !password) {
    res.status(404).send("invalid username or password");
    return;
  }
  try {
    let user;

    if (userType == "resident") {
      user = await ResidentDb.findOne({ email, password });
    } else if (userType == "medicalStaff") {
      user = await MedicalStaffDb.findOne({ email, password });
    } else {
      return res.status(400).json({ message: "Invalid userType" });
    }

    if (user) {
      const token = jwt.sign({ userId: user._id, userType }, "your_secret_key");
      res.json({ message: "Login successful", token, data: user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
