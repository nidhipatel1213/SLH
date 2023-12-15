var ResidentDb = require("../model/residentDb");

// retrieve and return all users/ retrive and return a single user
exports.find = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    ResidentDb.find({}, (err, residents) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(residents);
    });
  } else {
    try {
      const users = await ResidentDb.find({ email });

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
    const updatedResident = await ResidentDb.findOneAndUpdate(
      { email: email },
      req.body,
      { new: true }
    );

    if (!updatedResident) {
      return res.status(404).json({ message: 'Resident not found' });
    }

    res.json(updatedResident);
  } catch (error) {
    console.error('Error updating Resident:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a user with specified user id in the request
exports.delete = async (req, res) => {
  const { email } = req.query;
  try {
    const deletedResident = await ResidentDb.findOneAndDelete({ email: email });

    if (!deletedResident) {
      return res.status(404).json({ message: 'Resident not found' });
    }

    res.json({ message: 'Resident deleted successfully', deletedResident });
  } catch (error) {
    console.error('Error deleting Resident:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
