import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({ 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  ReferenceObject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  Discipline: {
    type: String,
    required: true
  },

  Program: {
    type: String,
    default: ''
  },

  CGPA: {
    type: Number,
    min: 0,
    max: 10,
    default: null
  },

  // Job status: true if seeking off-campus placements
  Jobstatus: [{
    JobRerenceID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPosting'
    },
    ApplicationStatus: {
      type: String,
      enum: ["applied", "in-review", "rejected", "accepted"]
    }
  }],

  JobReferenceID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPosting'
  },

  Status: {
    type: String,
    required: true
  },

  StudentID: {
    type: String,
    required: true,
    unique: true
  },

  Batch: {
    type: Number,
    required: true
  },

  SavedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPosting',
    default: []
  }],

  resumeLink: {
    type: String,
    default: ""
  },

  profilePhotoURL: {
    type: String,
    default: "" 
  }

}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);
export default Student;
