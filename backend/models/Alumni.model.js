import mongoose from "mongoose";

const alumniSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  InstituteId: {
    type: String,
    required: true,
  },
  MobileNumber: {
    type: Number,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  batch: {
    type: Number, // year like 2020, 2021, etc.
    required: true,
  },
  jobs: [
    {
      id: { type: String, required: true },
      role: { type: String, required: true },
    },
  ],
});

const Alumni = mongoose.model("Alumni", alumniSchema);
export default Alumni;
    