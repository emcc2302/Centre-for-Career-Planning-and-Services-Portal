import User from "../models/user.model.js";
import Student from "../models/student.model.js";

export const createStudentProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      studentID,
      discipline,
      program,
      cgpa,
      batch,
      status,
      imageUrl,
      resumeUrl
    } = req.body;

    // Validate required fields
    if (!studentID || !discipline || !batch || !status) {
      return res.status(400).json({
        message: "Missing required fields: studentID, discipline, batch, status"
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if student profile already exists
    const existing = await Student.findOne({ user: userId }); // Changed to user
    if (existing) {
      return res.status(400).json({ message: "Student profile already exists" });
    }

    // Check if StudentID is already taken (due to unique constraint)
    const takenID = await Student.findOne({ StudentID: studentID });
    if (takenID) {
      return res.status(400).json({ message: "Student ID already in use" });
    }

    // Create student document with required 'user' field set
    const newStudent = new Student({
      user: userId,              // Required field!
      ReferenceObject: userId,   // Optional to keep
      StudentID: studentID,
      Discipline: discipline,
      Program: program || "",
      CGPA: cgpa || null,
      Batch: batch,
      Status: status,
      profilePhotoURL: imageUrl,
      resumeLink: resumeUrl,
      Jobstatus: [],
      JobReferenceID: null,
      SavedJobs: []
    });

    await newStudent.save();

    return res.status(201).json({
      message: "Student profile created successfully",
      student: newStudent
    });
  } catch (error) {
    console.error("Error creating student profile:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getStudentProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const student = await Student.findOne({ ReferenceObject: userId });

    const profile = {
      name: user.name || "",
      email: user.email || "",
      studentID: student?.StudentID || "",
      discipline: student?.Discipline || "",
      program: student?.Program || "",
      cgpa: student?.CGPA || "",
      imageUrl:student?.profilePhotoURL || "",
      resumeUrl:student?.resumeLink || "",
    };

    return res.json(profile);
  } catch (error) {
    console.error("Error fetching student profile:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const updateStudentProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, discipline, program, cgpa,imageUrl,resumeUrl } = req.body;

    const student = await Student.findOne({ ReferenceObject: userId });
    if (!student) {  
      return res.status(404).json({ message: "Student not found" });
    }

    const user = await User.findById(student.ReferenceObject);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update User fields
    if (name) user.name = name;
    if (email) user.email = email;
    await user.save();

    // Update Student fields
    if (discipline) student.Discipline = discipline;
    if (program) student.Program = program;
    if (cgpa) student.CGPA = cgpa;
    if (imageUrl) student.profilePhotoURL = imageUrl;
    if (resumeUrl) student.resumeLink = resumeUrl;
    await student.save();

    return res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
