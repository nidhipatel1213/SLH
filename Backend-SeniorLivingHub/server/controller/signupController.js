const ResidentDb = require('../model/residentDb');
const MedicalStaffDb = require('../model/medicalStaffDb');

const rex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

exports.signup = async (req, res) => {
  const { email, userType, name, dateofbirth, contact, password } = req.body;

  try {
    // Input validation
    if (!password || !email || !userType) {
      return res.status(400).send('Invalid username, password, or userType');
    }

    if (!email.match(rex)) {
      return res.status(400).json({ message: 'Please enter a correct email address' });
    }

    if (!name || !dateofbirth || !contact) {
      return res.status(400).json({ message: 'Name, date of birth, and contact are required' });
    }

    // Check if the user is already registered
    const existingUser = await (userType === 'resident' ? ResidentDb : MedicalStaffDb).findOne({ email });
    if (existingUser?.name) {
      return res.status(400).json({ message: 'Email address already in use' });
    }

    // Create a new user
    const newUser = new (userType === 'resident' ? ResidentDb : MedicalStaffDb)(req.body);
    await newUser.save();

    const userData = {...req.body}
    delete userData.password
    res.status(200).json({
      message: 'User registered successfully',
      data: userData, // Avoid sending the password in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
};