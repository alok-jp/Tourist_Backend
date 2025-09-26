const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Basic Info
  fullName: {
    first: { type: String, required: true },
    middle: { type: String },
    last: { type: String, }
  },
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  phone:    { type: String, required: true },
  dob:      { type: Date, required: true },
  gender:   { type: String, enum: ['Male', 'Female', 'Other'], required: true },

  // Password 
  password: {type: String, required: true},

  // Address Info
  address: {
    residential: {
      street:  { type: String },
      city:    { type: String },
      state:   { type: String },
      zip:     { type: String },
      country: { type: String }
    },
    permanent: {
      street:  { type: String },
      city:    { type: String },
      state:   { type: String },
      zip:     { type: String },
      country: { type: String }
    },
    proofOfAddress: {
      fileUrl:  { type: String },
    }
  },

  // Identity Verification
  governmentID: {
    idType:  { type: String, enum: ['Passport', 'Aadhaar', 'Voter ID', 'Driving License'], required: true },
    idNumber: { type: String, required: true },
    idDocumentFront: {
      fileUrl:  { type: String },
    },
    idDocumentBack: {
      fileUrl:  { type: String },
    },
    selfieWithID: {
      fileUrl:  { type: String },
    }
  },

  // Optional Financial Info
  financialInfo: {
    occupation:    { type: String },
    incomeRange:   { type: String },
    employerName:  { type: String },
    taxIdNumber:   { type: String }
  },

  // KYC Status
  kycStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  

  // Timestamps
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
