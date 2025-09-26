const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Basic Info
  fullName: {
    first: { type: String, required: true },
    middle: { type: String },
    last: { type: String, required: true }
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
      fileName: { type: String },
      fileUrl:  { type: String },
      fileType: { type: String }
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

  // Security
  twoFactorEnabled: { type: Boolean, default: false },

  // Declarations
  acceptTerms:   { type: Boolean, required: true },
  acceptPrivacy: { type: Boolean, required: true },
  consentGiven:  { type: Boolean, required: true },

  // Upload Restrictions Metadata
  fileConstraints: {
    maxSizeMB: { type: Number, default: 5 },
    allowedTypes: { type: [String], default: ['jpg', 'jpeg', 'png', 'pdf'] }
  },

  // KYC Status
  kycStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  kycNotes: { type: String }, // Optional notes from reviewer/admin

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('KYCUser', KYCSchema);
