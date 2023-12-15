// models/resident.js
const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  contact: String,
  emergencyNumber: String,
  password: String,
  userType: String,
  dateofbirth: String,
  allergies: [
    {
      id: mongoose.Schema.Types.ObjectId,
      label: String,
      value: String,
    },
  ],
  pastMedicalTreatments: [
    {
      id: mongoose.Schema.Types.ObjectId,
      treatmentName: String,
      treatmentDate: Date,
      diagnosis: String,
      healthCondition: String,
      incidents: String,
    },
  ],
});

module.exports = mongoose.model("Resident", residentSchema);
