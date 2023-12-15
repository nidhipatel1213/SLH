var MedicalStaffDb = require("../model/medicalStaffDb");

// retrieve and return all users/ retrive and return a single user
exports.find = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    MedicalStaffDb.find({}, (err, medicalStaff) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(medicalStaff);
    });
  } else {
    try {
      const users = await MedicalStaffDb.find({ email });

      if (users.length > 0) {
        res.json({ message: "user found", users: users[0] });
      } else {
        res.json({ message: "No users found with the provided email" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

// Update a new idetified user by user id
exports.update = async (req, res) => {
  try {
    const { email } = req.body;
    const updatedMedicalStaff = await MedicalStaffDb.findOneAndUpdate(
      { email: email },
      req.body,
      { new: true }
    );

    if (!updatedMedicalStaff) {
      return res.status(404).json({ message: 'Resident not found' });
    }

    res.json(updatedMedicalStaff);
  } catch (error) {
    console.error('Error updating Medical staff data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a user with specified user id in the request
exports.delete = async (req, res) => {
  const { email } = req.query;
  try {
    const deletedMedicalStaff = await MedicalStaffDb.findOneAndDelete({ email: email });

    if (!deletedMedicalStaff) {
      return res.status(404).json({ message: 'Medical staff not found' });
    }

    res.json({ message: 'Medical staff deleted successfully', deletedMedicalStaff });
  } catch (error) {
    console.error('Error deleting Medical staff data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};