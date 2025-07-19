import Alumni from '../../models/Alumni.model.js';

// THESE ARE THE CONTROLLER FOR STUDENT PAGE.

export const alumniList = async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.json(alumni);
  } catch (error) {
    res.json({ message: error });
  }
};

// Search by Job ID
export const searchAlumniByJobId = async (req, res) => {
  const { jobId } = req.query;
  if (!jobId) return res.status(400).json({ message: "Job ID is required" });

  try {
    const alumni = await Alumni.find({ "jobs.id": jobId });
    if (!alumni.length) return res.status(404).json({ message: "No alumni found with given job ID" });
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Search by Job Role
export const searchAlumniByJobRole = async (req, res) => {
  const { jobRole } = req.query;
  if (!jobRole) return res.status(400).json({ message: "Job role is required" });

  try {
    const alumni = await Alumni.find({ "jobs.role": { $regex: jobRole, $options: "i" } });
    if (!alumni.length) return res.status(404).json({ message: "No alumni found with given job role" });
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Search by Company
export const searchAlumniByCompany = async (req, res) => {
  const { company } = req.query;
  if (!company) return res.status(400).json({ message: "Company is required" });

  try {
    const alumni = await Alumni.find({ company: { $regex: company, $options: "i" } });
    if (!alumni.length) return res.status(404).json({ message: "No alumni found with given company" });
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 🔍 Search by Batch Year
export const searchAlumniByBatch = async (req, res) => {
  const { batch } = req.query;
  console.log(batch);
  if (!batch) return res.status(400).json({ message: "Batch is required" });

  try {
    const alumni = await Alumni.find({ batch });
    if (!alumni.length) return res.status(404).json({ message: "No alumni found for the given batch" });
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 🔍 Search by Name
export const searchAlumniByName = async (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ message: "Name is required" });

  try {
    const alumni = await Alumni.find({ name: { $regex: name, $options: "i" } });
    if (!alumni.length) return res.status(404).json({ message: "No alumni found with the given name" });
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};








// THESE ARE THE CONTROLLER FOR ADMIN PAGE.


// Add new alumni
export const addAlumni = async (req, res) => {
  const newAlumni = new Alumni(req.body);

  try {
    const savedAlumni = await newAlumni.save();
    res.status(201).json(savedAlumni);
  } catch (error) {
    res.status(400).json({ message: "Failed to add alumni", error });
  }
};

// Update alumni details
export const updateAlumni = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedAlumni = await Alumni.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedAlumni) return res.status(404).json({ message: "Alumni not found" });

    res.json(updatedAlumni);
  } catch (error) {
    res.status(400).json({ message: "Failed to update alumni", error });
  }
};

// Delete alumni
export const deleteAlumni = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAlumni = await Alumni.findByIdAndDelete(id);
    if (!deletedAlumni) return res.status(404).json({ message: "Alumni not found" });

    res.json({ message: "Alumni deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete alumni", error });
  }
};








// CONTROLLER FOR HIMSELF THE ADMIN

// Get logged-in alumni's own profile
export const getOwnAlumniProfile = async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.user.id); // req.user comes from middleware
    if (!alumni) return res.status(404).json({ message: "Alumni profile not found" });
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

// Update logged-in alumni's own profile
export const updateOwnAlumniProfile = async (req, res) => {
  try {
    const updated = await Alumni.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Alumni profile not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update profile", error });
  }
};

// (Optional) Delete own profile
export const deleteOwnAlumniProfile = async (req, res) => {
  try {
    const deleted = await Alumni.findByIdAndDelete(req.user.id);
    if (!deleted) return res.status(404).json({ message: "Alumni profile not found" });
    res.json({ message: "Alumni profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete profile", error });
  }
};
