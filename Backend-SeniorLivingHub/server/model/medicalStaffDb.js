// models/medicalStaff.js
const mongoose = require('mongoose');

const medicalStaffSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  contact: String,
  emergencyNumber: String,
  password: String,
  userType: String,
  dateofbirth: String,
  patientsTreated: [
    {
      id: mongoose.Schema.Types.ObjectId,
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
    }
  ],
});

module.exports = mongoose.model('MedicalStaff', medicalStaffSchema);
